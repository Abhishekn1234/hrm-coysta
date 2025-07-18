<?php

namespace App\Http\Controllers\Admin;

use App\CPU\Helpers;
use App\CPU\ImageManager;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\User;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
class ProjectController extends Controller
{
    function list(Request $request)
    {
        if (auth('customer')->user() == NULL) {
            return redirect()->route('admin.auth.logout');
        }

        $query_param = [];
        $search = $request['search'];
        
        $user_id = auth('customer')->user()->id;
        $user_type = auth('customer')->user()->user_type;
        
        $owner = User::where(['status' => '1'])->whereIn('user_type', ['PRODUCT_OWNER','CLIENT', 'CEO'])->get();
        $staff_list = User::where(['status' => '1'])->whereIn('user_type', ['SCRUM_MASTER', 'HR','TEAM_LEAD','TECHNICAL_LEAD','MARKETING_MANAGER','STAFF'])->get();
        
        if ($request->has('search')) {
            $projects = Project::where('project_name', '!=' , '')->where(function ($q) use ($search) {
                $q->Where('project_name', 'like', "%{$search}%");
            });
        } else {
            $projects = Project::where('project_name', '!=' , '');
        }
        
        if($user_type == 'PRODUCT_OWNER' || $user_type == 'CLIENT'){
            $projects = $projects->where(['product_owner_id' => $user_id]);
        }
        
        $query_param = ['search' => $request['search']];
        
        $counts = $projects;
        $projects = $projects->orderBy('id', 'ASC')->paginate(Helpers::pagination_limit())->appends($query_param);

        return view('admin-views.project.view', compact('projects','search','counts','owner','staff_list'));
    }

public function store(Request $request)
{
    Log::info('Project creation request received.', ['request_data' => $request->all()]);

    try {
        $validated = $request->validate([
            'project_name' => 'required',
            'project_description' => 'required',
            'project_starting_date' => 'required|date',
            'expected_release_date' => 'required|date',
            'deadline' => 'required|date',
            'product_owner_id' => 'required|exists:users,id',
            'customer_id' => 'required|exists:customers,id', // ✅ Added validation for customer_id
        ], [
            'project_name.required' => 'project_name is required!',
            'project_description.required' => 'project_description is required!',
            'project_starting_date.required' => 'project_starting_date is required!',
            'expected_release_date.required' => 'expected_release_date is required!',
            'deadline.required' => 'deadline is required!',
            'product_owner_id.required' => 'product_owner_id is required!',
            'customer_id.required' => 'customer_id is required!', // ✅ Custom message
        ]);

        $staffIds = $request->choice_staffs ?? [];

        Log::info('Validated project data.', [
            'validated' => $validated,
            'staff_ids' => $staffIds,
        ]);

        $project = new Project([
            'project_name' => $request->project_name,
            'project_description' => $request->project_description,
            'project_starting_date' => $request->project_starting_date,
            'expected_release_date' => $request->expected_release_date,
            'deadline' => $request->deadline,
            'product_owner_id' => $request->product_owner_id,
            'customer_id' => $request->customer_id, // ✅ Set customer_id
            'staff_ids' => $staffIds,
        ]);

        $project->save();

        Log::info('Project saved successfully.', ['project_id' => $project->id]);

        return response()->json([
            'success' => true,
            'message' => 'Project added successfully!',
            'data' => $project
        ], 201);
    } catch (\Illuminate\Validation\ValidationException $e) {
        Log::warning('Validation failed.', ['errors' => $e->errors()]);
        return response()->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $e->errors()
        ], 422);
    } catch (\Exception $e) {
        Log::error('Error while saving project.', ['error' => $e->getMessage()]);
        return response()->json([
            'success' => false,
            'message' => 'Something went wrong',
            'error' => $e->getMessage()
        ], 500);
    }
}



    public function status(Request $request)
    {
        if ($request->ajax()) {
            $project = Project::find($request->id);
            $project->status = $request->status;
            $project->save();
            $data = $request->status;
            return response()->json($data);
        }
    }

    public function edit($id)
    {
        if (auth('customer')->user() == NULL) {
            return redirect()->route('admin.auth.logout');
        }
    
        $owner = User::where(['status' => '1'])->whereIn('user_type', ['PRODUCT_OWNER','CLIENT', 'CEO'])->get();
        $staff_list = User::where(['status' => '1'])->whereIn('user_type', ['SCRUM_MASTER', 'HR','TEAM_LEAD','TECHNICAL_LEAD','MARKETING_MANAGER','STAFF'])->get();
        
        $project = Project::where('id', $id)->first();
        return view('admin-views.project.edit',compact('project','owner','staff_list'));
    }

    public function update(Request $request,$id)
    {
        if (auth('customer')->user() == NULL) {
            return redirect()->route('admin.auth.logout');
        }
        
        $request->validate([
            'project_name' => 'required',
            'project_description' => 'required',
            'project_starting_date' => 'required',
            'expected_release_date' => 'required',
            'deadline' => 'required',
            'product_owner_id' => 'required',
        ], [
            'project_name.required' => 'project_name is required!',
            'project_description.required' => 'project_description is required!',
            'project_starting_date.required' => 'project_starting_date is required!',
            'expected_release_date.required' => 'expected_release_date is required!',
            'deadline.required' => 'deadline is required!',
            'product_owner_id.required' => 'product_owner_id is required!',
        ]);

        $project = Project::find($id);
        $project->project_name = $request->project_name;
        $project->project_description = $request->project_description;
        $project->project_starting_date = $request->project_starting_date;
        $project->expected_release_date = $request->expected_release_date;
        $project->deadline = $request->deadline;
        $project->product_owner_id = $request->product_owner_id;
        $project->staff_ids = json_encode($request->choice_staffs);
        $project->save();

        Toastr::success('project updated successfully!');
        return redirect()->route('admin.project.list');
    }
    
    public function view(Request $request, $id)
    {
        $project = Project::find($id);
        if (isset($project)) {
            $owner = User::where(['status' => '1','id' => $project->product_owner_id])->first();
            $project->owner_name = $owner->name . ' ( ' . $owner->user_type . ' : ' . $owner->designation . ' )';
            return view('admin-views.project.project-view', compact('project'));
        }
        Toastr::error('project not found!');
        return back();
    }

    public function delete(Request $request)
    {
        $br = Project::find($request->id);
        $br->delete();
        return response()->json();
    }
}
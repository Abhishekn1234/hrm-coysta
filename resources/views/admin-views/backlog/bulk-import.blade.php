@extends('layouts.back-end.app')

@section('title', \App\CPU\translate('backlog Bulk Import'))

@push('css_or_js')
@endpush

@section('content')
    <div class="content container-fluid">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="{{ route('admin.dashboard') }}">{{ \App\CPU\translate('Dashboard') }}</a>
                </li>
                <li class="breadcrumb-item" aria-current="page"><a
                        href="{{ route('admin.backlog.list') }}">{{ \App\CPU\translate('backlog') }}</a>
                </li>
                <li class="breadcrumb-item">{{ \App\CPU\translate('bulk_import') }} </li>
            </ol>
        </nav>
        <!-- Content Row -->
        <div class="row" style="text-align: {{ Session::get('direction') === 'rtl' ? 'right' : 'left' }};">
            <div class="col-12">
                <div class="jumbotron" style="background: white">
                    <h1 class="display-4">{{ \App\CPU\translate('Instructions') }} : </h1>
                    <p>1. {{ \App\CPU\translate('Download the format file and fill it with proper data') }}.</p>

                    <p>2.
                        {{ \App\CPU\translate('You can download the example file to understand how the data must be filled') }}.
                    </p>

                    <p>3.
                        {{ \App\CPU\translate('Once you have downloaded and filled the format file, upload it in the form below and submit') }}.
                    </p>

                    <p>4. {{ \App\CPU\translate('You can get project id from their list, please input the right ids') }}.
                    </p>

                </div>
            </div>

            <div class="col-md-12">
                <form class="backlog-form" action="{{ route('admin.backlog.bulk-import') }}" method="POST"
                    enctype="multipart/form-data">
                    @csrf
                    <div class="card mt-2 rest-part">
                        <div class="card-header">
                            <h4>{{ \App\CPU\translate('Import backlog File') }}</h4>
                            <a href="{{ asset('assets/backlog_bulk_format.xlsx') }}" download=""
                                class="btn btn-secondary">{{ \App\CPU\translate('Download Format') }}</a>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-4">
                                        <input type="file" name="backlogs_file">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card card-footer">
                        <div class="row">
                            <div class="col-md-12" style="padding-top: 20px">
                                <button type="submit" class="btn btn-primary">{{ \App\CPU\translate('Submit') }}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@push('script')
@endpush

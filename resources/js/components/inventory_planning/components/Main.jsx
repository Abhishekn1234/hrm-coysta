// import React, { useState } from 'react';
// import './Main.css';
// import EventPanel from './EventPanel';
// import PlanningPanel from './PlanningPanel';

// const initialEvents = [
//   {
//     id: 1,
//     type: 'Conference',
//     title: 'Tech Innovation Summit 2023',
//     status: 'In Progress',
//     manager: 'Sarah Johnson',
//     date: 'Jun 15-17, 2023',
//     client: 'ABC Tech Corp',
//     progress: 85,
//   },
//   {
//     id: 2,
//     type: 'Wedding',
//     title: 'Smith & Johnson Wedding',
//     status: 'Planning',
//     manager: 'Robert Davis',
//     date: 'Aug 10, 2023',
//     client: 'Private Client',
//     progress: 45,
//   },
// ];

// const Main = () => {
//   const [events, setEvents] = useState(initialEvents);
//   const [selectedEvent, setSelectedEvent] = useState(initialEvents[0]);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isCreatingNew, setIsCreatingNew] = useState(false);

//   const handleEventSelect = (event) => {
//     setSelectedEvent(event);
//     setIsCreatingNew(false);
//     setActiveTab('overview');
//   };

//   const handleCreateEvent = () => {
//     const newEventTemplate = {
//       id: Date.now(), // Temporary ID
//       type: '',
//       title: 'Untitled Event',
//       status: 'Draft',
//       manager: '',
//       date: new Date().toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric'
//       }),
//       client: '',
//       progress: 0,
//       isNew: true
//     };
    
//     setEvents([...events, newEventTemplate]);
//     setSelectedEvent(newEventTemplate);
//     setIsCreatingNew(true);
//     setActiveTab('custom'); // Open the custom view tab
//   };

//   const handleSaveNewEvent = (savedEvent) => {
//     setEvents(events.map(event => 
//       event.id === savedEvent.id ? {...savedEvent, isNew: false} : event
//     ));
//     setSelectedEvent({...savedEvent, isNew: false});
//     setIsCreatingNew(false);
//   };

//   const handleCancelNewEvent = () => {
//     setEvents(events.filter(event => !event.isNew));
//     setSelectedEvent(events.length > 0 ? events[0] : null);
//     setIsCreatingNew(false);
//     setActiveTab('overview');
//   };

//   return (
//     <div>
//       <div className="dashboard-header">
//         <div className="header-title">
//           <h1>
//             <i className="fas fa-calendar-alt"></i> Event Management Dashboard
//           </h1>
//           <p>Manage events, resources, staff assignments, and budgets</p>
//         </div>
//         <div className="header-actions">
//           <button
//             className="btn btn-primary"
//             onClick={handleCreateEvent}
//           >
//             <i className="fas fa-plus-circle"></i> New event
//           </button>

//           <button
//             className="btn btn-secondary"
//             onClick={() => window.location.reload()}
//           >
//             <i className="fas fa-sync-alt"></i> Refresh
//           </button>

//           <button className="btn btn-inventory">
//             <i className="fas fa-boxes"></i> Add Resources
//           </button>
//         </div>
//       </div>

//       <div className="dashboard-container">
//         <EventPanel
//           events={events}
//           selectedEvent={selectedEvent}
//           onEventSelect={handleEventSelect}
//           isCreatingNew={isCreatingNew}
//         />
//         <PlanningPanel
//           selectedEvent={selectedEvent}
//           activeTab={activeTab}
//           onTabChange={setActiveTab}
//           isCreatingNew={isCreatingNew}
//           onSaveNewEvent={handleSaveNewEvent}
//           onCancelNewEvent={handleCancelNewEvent}
//         />
//       </div>
//     </div>
//   );
// };

// export default Main;


import React, { useState, useEffect, useRef } from 'react';
import './Main.css';
import EventPanel from './EventPanel';
import PlanningPanel from './PlanningPanel';
import ProjectPanel from './ProjectPanel';
import ProjectPlanningPanel from './ProjectPlanningPanel';
import axios from 'axios';


  

const initialEvents = [
  {
    id: 1,
    type: 'Conference',
    title: 'Tech Innovation Summit 2023',
    status: 'In Progress',
    manager: 'Sarah Johnson',
    date: 'Jun 15-17, 2023',
    client: 'ABC Tech Corp',
    progress: 85,
  },
  {
    id: 2,
    type: 'Wedding',
    title: 'Smith & Johnson Wedding',
    status: 'Planning',
    manager: 'Robert Davis',
    date: 'Aug 10, 2023',
    client: 'Private Client',
    progress: 45,
  },
];

const initialProjects = [
  {
    id: 1,
    type: 'Software',
    title: 'E-commerce Platform Development',
    status: 'In Progress',
    manager: 'Alex Brown',
    date: 'Jun 15 - Dec 15, 2023',
    client: 'Tech Retail Inc',
    progress: 60,
  },
  {
    id: 2,
    type: 'Construction',
    title: 'Office Building Renovation',
    status: 'Planning',
    manager: 'Emma Wilson',
    date: 'Aug 1, 2023 - Mar 1, 2024',
    client: 'Global Properties',
    progress: 30,
  },
];

const Main = () => {
  const [dashboard, setDashboard] = useState('events');
  const [events, setEvents] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState(initialEvents[0]);
  const [eventsActiveTab, setEventsActiveTab] = useState('overview');
  const [isCreatingNewEvent, setIsCreatingNewEvent] = useState(false);
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState(initialProjects[0]);
  const [projectsActiveTab, setProjectsActiveTab] = useState('overview');
  const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);
 

  useEffect(() => {
    axios.get('/api/v1/quotations/list')
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          const transformedData = response.data.data.map(quotation => ({
            id: quotation.id,
            type: 'Quotation',
            title: quotation.project_name || quotation.quotation_number,
            status: quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1),
            manager: 'Sales Team',
            date: quotation.date || new Date().toLocaleDateString(),
            client: quotation.customer_name,
            progress: 0,
            rawData: quotation
          }));
          setProjects(transformedData);
        } else {
          console.error('Expected an array in response.data.data, got:', response.data.data);
          setProjects([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching quotation data', error);
        setProjects([]); // Fallback to empty array on error
      });
  }, []);

  console.log("quotation list", projects);

  const getCurrentDashboardState = () => {
    if (dashboard === 'events') {
      return {
        data: events,
        setData: setEvents,
        selectedItem: selectedEvent,
        setSelectedItem: setSelectedEvent,
        activeTab: eventsActiveTab,
        setActiveTab: setEventsActiveTab,
        isCreatingNew: isCreatingNewEvent,
        setIsCreatingNew: setIsCreatingNewEvent,
        title: 'Event Management Dashboard',
        icon: 'fas fa-calendar-alt',
        description: 'Manage events, resources, staff assignments, and budgets',
        newButtonText: 'New event'
      };
    } else {
      return {
        data: projects,
        setData: setProjects,
        selectedItem: selectedProject,
        setSelectedItem: setSelectedProject,
        activeTab: projectsActiveTab,
        setActiveTab: setProjectsActiveTab,
        isCreatingNew: isCreatingNewProject,
        setIsCreatingNew: setIsCreatingNewProject,
        title: 'Project Planning Dashboard',
        icon: 'fas fa-project-diagram',
        description: 'Manage projects, resources, team assignments, and budgets',
        newButtonText: 'New project'
      };
    }
  };

  const handleSelect = (item) => {
    const state = getCurrentDashboardState();
    state.setSelectedItem(item);
    state.setIsCreatingNew(false);
    state.setActiveTab('overview');
  };

  const handleCreate = () => {
    const state = getCurrentDashboardState();
    const newItemTemplate = {
      id: Date.now(),
      type: '',
      title: dashboard === 'events' ? 'Untitled Event' : 'Untitled Project',
      status: 'Draft',
      manager: '',
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      client: '',
      progress: 0,
      isNew: true
    };
    
    state.setData([...state.data, newItemTemplate]);
    state.setSelectedItem(newItemTemplate);
    state.setIsCreatingNew(true);
    state.setActiveTab('details');
  };

  const handleSave = (savedItem) => {
    const state = getCurrentDashboardState();
    state.setData(state.data.map(item => 
      item.id === savedItem.id ? {...savedItem, isNew: false} : item
    ));
    state.setSelectedItem({...savedItem, isNew: false});
    state.setIsCreatingNew(false);
  };

  const handleCancel = () => {
    const state = getCurrentDashboardState();
    if (state.isCreatingNew) {
      state.setData(state.data.filter(item => !item.isNew));
      state.setSelectedItem(state.data.length > 0 ? state.data[0] : null);
    }
    state.setIsCreatingNew(false);
    state.setActiveTab('overview');
  };

  const currentState = getCurrentDashboardState();

  return (
    <div className="dashboard-wrapper">
      {/* Dashboard Switcher Tabs */}
      <div className="dashboard-switcher">
        <div className="switcher-container">
          <button 
            className={`switch-btn ${dashboard === 'events' ? 'active' : ''}`}
            onClick={() => setDashboard('events')}
          >
            <i className="fas fa-calendar-alt"></i> Event Management
          </button>
          <button 
            className={`switch-btn ${dashboard === 'projects' ? 'active' : ''}`}
            onClick={() => setDashboard('projects')}
          >
            <i className="fas fa-project-diagram"></i> Project Planning
          </button>
        </div>
      </div>

      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <h1>
              <i className={currentState.icon}></i> {currentState.title}
            </h1>
            <p>{currentState.description}</p>
          </div>
          <div className="header-actions">
            {dashboard === 'events' && (
                <button
                  className="btn btn-primary"
                  onClick={handleCreate}
                >
                  <i className="fas fa-plus-circle"></i> 
                  {currentState.newButtonText}
                </button>
              )}

            <button
              className="btn btn-secondary"
              onClick={() => window.location.reload()}
            >
              <i className="fas fa-sync-alt"></i> Refresh
            </button>

            {/* <button className="btn btn-inventory">
              <i className="fas fa-boxes"></i> Add Resources
            </button> */}
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-container">
        {dashboard === 'events' ? (
          <>
            <EventPanel
              events={currentState.data}
              selectedEvent={currentState.selectedItem}
              onEventSelect={handleSelect}
              isCreatingNew={currentState.isCreatingNew}
            />
            <PlanningPanel
              selectedEvent={currentState.selectedItem}
              activeTab={currentState.activeTab}
              onTabChange={currentState.setActiveTab}
              isCreatingNew={currentState.isCreatingNew}
              onSaveEvent={handleSave}
              onCancelEvent={handleCancel}
              dashboardType={dashboard}
            />
          </>
        ) : (
          <>
            <ProjectPanel
              projects={currentState.data}
              selectedProject={currentState.selectedItem}
              onProjectSelect={handleSelect}
              isCreatingNew={currentState.isCreatingNew}
            />
            <ProjectPlanningPanel
              selectedProject={currentState.selectedItem}
              activeTab={currentState.activeTab}
              onTabChange={currentState.setActiveTab}
              isCreatingNew={currentState.isCreatingNew}
              onSaveProject={handleSave}
              onCancelProject={handleCancel}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
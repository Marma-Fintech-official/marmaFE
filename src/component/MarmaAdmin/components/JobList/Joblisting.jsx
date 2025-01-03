import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, LogOut, PlusSquare, SlidersHorizontal, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import JobModal from './JobModal';
import EventModal from './EventModal';
import { GetAllPostedJobs, SortingCandidate, deleteEvent, deleteJobPost, fetchCandidates, fetchEvents } from '../../API/Api';



export default function Dashboard() {
  console.log("check the function");
  const [filter, setFilter] = useState('all');
  const [Candidates, setCandidates] = useState([])
  const [Events, setEvents] = useState([])
  const [PostedJobs, setpostedJobs] = useState([])
  const [activeTab, setActiveTab] = useState('Job');
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [jobModal, setJobModal] = useState(false)
  const [eventModal, setEventModal] = useState(false)
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterToggle, setFilterToggle] = useState(false);



  const navigate = useNavigate()


  // API calling 
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === 'Job') {
          const response = await fetchCandidates(sortOrder);
          setCandidates(response.data);
          console.log(response.data);
        }
        else if (activeTab === 'Event') {
          const response = await fetchEvents();
          console.log("this is my table", response);
          setEvents(response);
        }
        else if (activeTab === 'PostedJob') {
          // Add your API call for the postedJob tab here
          const response = await GetAllPostedJobs(); // Replace with your function
          console.log("postedJob data:", response);
          setpostedJobs(response.data);
        }
      }
      catch (err) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: err.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }

    fetchData();
  }, [activeTab]);



  const filterDropDown = () => {
    setFilterToggle(!filterToggle)
  }

  const [sortBy, setSortBy] = useState('default');

  const handleShortChange = async (order) => {
    setSortBy(order);  // Update the state to reflect the selected option
    const validOrder = order === "newest" ? "desc" : order;

    const response = await SortingCandidate(validOrder);
    setCandidates(response.data)
    console.log(response, 'Selecting by the values');
  }


  // MyEventDelete function
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this event!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });

      // If the user confirms, proceed with deletion
      if (result.isConfirmed) {
        const response = await deleteEvent(id);
        console.log(response, 'response');


        if (response.status == 200) {
          // Show success alert
          await Swal.fire({
            title: 'Deleted!',
            text: 'The event has been deleted successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          })

          const updatedEvents = await fetchEvents();
          setEvents(updatedEvents)
          console.log(updatedEvents, 'updated events');
        } else {
          // Handle API error
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete the event.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    } catch (error) {
      // // Handle exceptions
      // Swal.fire({
      //   title: 'Error!',
      //   text: 'An error occurred while deleting the event.',
      //   icon: 'error',
      //   confirmButtonText: 'OK',
      // });
      // console.error(error);
    }
  };

  // MyJobDelete function
  const handleDeleteJob = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this job post!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });

      // If the user confirms, proceed with deletion
      if (result.isConfirmed) {
        const response = await deleteJobPost(id);
        console.log(response, 'response');


        if (response.status == 200) {
          // Show success alert
          await Swal.fire({
            title: 'Deleted!',
            text: 'The Job has been deleted successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          })

          const updatedPostedEvent = await GetAllPostedJobs();
          setpostedJobs(updatedPostedEvent.data)
        } else {
          // Handle API error
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete the event.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    } catch (error) {
      // // Handle exceptions
      // Swal.fire({
      //   title: 'Error!',
      //   text: 'An error occurred while deleting the event.',
      //   icon: 'error',
      //   confirmButtonText: 'OK',
      // });
      // console.error(error);
    }
  }


  const handleViewEvent = (link) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferer')
    }
    else {
      console.error('The Link is not Working')
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        navigate("/admin", { replace: true });

        Swal.fire('Logged Out', 'You have been logged out successfully.', 'success');
      }
    });
  };

  const handleFilterCategory = async (department) => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    try {
      // Build the URL for the API call with the selected department
      const url = `http://ec2-18-214-60-96.compute-1.amazonaws.com:7001/applications?sort=asc&department=${department}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Add token in the Authorization header
        },
      });
      console.log(response);

      const data = await response.json();

      if (response.ok) {
        setCandidates(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch data');
      }
    } catch (err) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: err.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };


  const handleFilterEvent = async (time) => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const url = `http://ec2-18-214-60-96.compute-1.amazonaws.com:7001/event/getallevent?timeFrame=${time}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Add token in the Authorization header
        },
      });

      const data = await response.json();

      if (response.ok) {
        setEvents(data.events); // Update the events list
        setSelectedEventTime(time); // Update selected category
      } else {
        throw new Error(data.message || 'Failed to fetch filtered events');
      }
    } catch (err) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: err.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };


  const OpenModal = (data) => {

    if (data == "Job") {
      setJobModal(true);
    }
    if (data == "Event") {
      setEventModal(true)

    }

  }



  return (
    <div className="min-h-screen bg-gray-50 pt-2">
      {/* Header */}
      <header className="bg-white px-6 py-4 flex justify-between items-center m-5 border rounded-xl border-gray-100">
        <div>
          <img src="/logob.png" alt="Logo" style={{ width: '130px' }} />
        </div>
        <div className="relative flex items-center cursor-pointer" onClick={() => setIsTabOpen((prev) => !prev)}>
          <div className="flex flex-col items-center gap-2 text-sm">
            <span></span>
            <span className="text-gray-500">OPTIONS</span>
          </div>
          <div className="ml-2 mt-1.5">
            {isTabOpen ? <ChevronUp /> : <ChevronDown />}
          </div>

          {/* Modal below the profile div */}
          {isTabOpen && (
            <div className="absolute bg-white shadow-lg rounded-md w- mt-32 p-4" >
              <div className="flex justify-center items-center flex-col">
                <button className=" text-black flex rounded-md" onClick={handleLogout}>
                  <LogOut className='text-black h-5 ' /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Tabs */}
        <div className='flex justify-between'>
          <div className="flex  mb-8">
            <button
              onClick={() => setActiveTab('Job')}
              className={`px-6 py-2   rounded-s-lg transition-colors duration-200 ${activeTab === 'Job' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
            >
              Job
            </button>
            <button
              onClick={() => setActiveTab('Event')}
              className={`px-6 py-2 rounded-sm transition-colors duration-200 ${activeTab === 'Event' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
            >
              Event
            </button>
            <button
              onClick={() => setActiveTab('PostedJob')}
              className={`px-6 py-2 rounded-e-lg transition-colors duration-200 ${activeTab === 'PostedJob' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
            >
              Postedjob
            </button>

          </div>
          <div>
            {activeTab !== 'PostedJob' && (
              <button className='flex border rounded-md border-black p-2' onClick={() => OpenModal(activeTab)}>
                <p className='flex gap-2'>{activeTab === 'Job' ? 'Post Job' : 'Add Event'}<PlusSquare /></p>
              </button>
            )}
            {activeTab === 'Job' && (
              <JobModal
                isOpen={jobModal}
                onClose={() => setJobModal(false)} // Close modal when it is closed
              />
            )}

            {activeTab === 'Event' && (
              <EventModal
                isOpen={eventModal}
                onClose={() => setEventModal(false)}
                setEvents={setEvents}
              />
            )}
          </div>

        </div>


        <div className="bg-white rounded-lg p-6">
          <div className="flex space-x-4 py-6 px-4">
            <p className='pt-1.5'>
              {activeTab === 'Job' ? 'Candidate List' : activeTab === 'Event' ? 'Event List' : 'Posted Job List'}
            </p>
            {activeTab === 'Job' && (
              <div className="flex gap-4">
                <div className="relative inline-block">
                  <select
                    className="px-5 py-3 bg-gray-100 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={sortBy}
                    onChange={(e) => handleShortChange(e.target.value)}
                  >
                    <option value="default" disabled>
                      Sort by
                    </option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                  <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-black" />
                  </span>
                </div>

                <button
                  onClick={filterDropDown}
                  className="px-5 py-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-xl flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Filter
                  <SlidersHorizontal />
                </button>
                {filterToggle && (
                  <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterCategory('des')}>Design</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterCategory('it')}>It</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterCategory('marketing')}>marketing</li>
                    </ul>
                  </div>
                )}

              </div>
            )}
            {activeTab === 'Event' && (
              <div className="flex gap-4">

                <button
                  onClick={filterDropDown}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-md flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Filter
                  <SlidersHorizontal />
                </button>
                {filterToggle && (
                  <div className="absolute mt-14 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterEvent('One month')}>One month</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterEvent('Last week')}>last week</li>
                    </ul>
                  </div>
                )}
              </div>
            )}


          </div>

          {/* Dynamic Table */}
          <div className="overflow-x-auto">
            <table className="w-full rounded-xl">
              <thead className="bg-gray-900 text-white">
                <tr>
                  {activeTab === 'Job' ? (
                    <>
                      <th className="px-4 py-6 text-left rounded-s-xl">Candidate ID</th>
                      <th className="px-4 py-6 text-left">Name</th>
                      <th className="px-4 py-6 text-left">applyingDesignation</th>
                      <th className="px-4 py-6 text-left">Apply Date</th>
                      <th className="px-4 py-6 text-left">Department</th>
                      <th className="px-4 py-6 text-left">Current Salary</th>
                      <th className="px-4 py-6 text-left">Expected Salary</th>
                      <th className="px-4 py-6 text-left rounded-r-xl">Resume</th>
                    </>
                  ) : activeTab === 'Event' ? (
                    <>
                      <th className="px-4 py-6 text-start rounded-s-xl">Event ID</th>
                      <th className="px-4 py-6 text-center">Event Link</th>
                      <th className="px-4 py-6 text-center">Date</th>
                      <th className="px-4 py-6 text-center">View</th>
                      <th className="px-4 py-6 text-center rounded-r-xl">Delete</th>
                    </>
                  ) : activeTab === 'PostedJob' ? (
                    <>
                      <th className="px-4 py-6 text-left rounded-s-xl">Job ID</th>
                      <th className="px-4 py-6 text-left">Job Title</th>
                      <th className="px-4 py-6 text-left">Department</th>
                      <th className="px-4 py-6 text-left">Posted Date</th>
                      <th className="px-4 py-6 text-left">Jobtype</th>
                      <th className="pl-3 py-6 text-left rounded-r-xl">Delete the job</th>
                    </>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {activeTab === 'Job'
                  ? Candidates.map((candidate, index) => (
                    <tr key={candidate.id} className="hover:bg-gray-50 border-b border-gray-200">
                      <td className="px-5 py-6">{candidate.uuid}</td>
                      <td className="px-4 py-6">{candidate.name}</td>
                      <td className="px-5 py-6">{candidate.applyingDesignation}</td>
                      <td className="px-5 py-6">
                        {new Date(candidate.createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-5 py-6">{candidate.department}</td>
                      <td className="px-5 py-6">{candidate.currentsalary}</td>
                      <td className="px-5 py-6">{candidate.expectedsalary}</td>
                      <td className="px-5 py-6">
                        <a href={candidate.resume} target='_blank' rel='noopener noreferrer' className='text-green-700'>
                          View Resume
                        </a>
                      </td>
                    </tr>
                  ))
                  : activeTab === 'Event'
                    ? Events.map((event, index) => (
                      <tr key={event.id} className="hover:bg-gray-50 border-b border-gray-200">
                        <td className="px-5 py-6">{event.uuid}</td>
                        <td className="px-5 py-6 text-start">{event.link}</td>
                        <td className="px-5 py-6" style={{ display: 'list-item', marginLeft: '15px' }}>
                          {new Date(event.eventDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: '2-digit',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="px-5 py-6 text-center">
                          <button onClick={() => handleViewEvent(event.link)} className="text-blue-600 hover:text-green-800">
                            View Event
                          </button>
                        </td>
                        <td className="px-5 py-6 text-center">
                          <button onClick={() => handleDelete(event._id)} className="text-gray-600 hover:text-red-600 ">
                            <Trash2 className="w-4 h-4 " />
                          </button>
                        </td>
                      </tr>
                    ))
                    : activeTab === 'PostedJob'
                      ? PostedJobs.map((job, index) => (
                        <tr key={job.id} className="hover:bg-gray-50 border-b border-gray-200">
                          <td className="px-5 py-6">{job._id.slice(-4)}</td>
                          <td className="px-5 py-6">{job.jobTitle}</td>
                          <td className="px-5 py-6">{job.jobCategory}</td>
                          <td className="px-5 py-6">
                            {new Date(job.createdAt).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="px-5 py-6">{job.jobType}</td>

                          <td className="px-5 py-6 ">
                            <button onClick={() => handleDeleteJob(job._id)} className=" text-gray-600 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                      : null}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
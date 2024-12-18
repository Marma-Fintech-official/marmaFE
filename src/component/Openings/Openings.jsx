import React, { useEffect, useState } from 'react';
import { ChevronDown, Plus, X } from 'lucide-react';
import './Openings.css';
import JobApplicationForm from './JobApplicationForm';
import Modal from './Modal';
import UseBodyScrollLock from '../Wrapperline/UseBodyScrollLock';


const jobListings = [
  { id: 1, jobTitle: 'Creative Front-end Developer', jobType: 'Harrogate (Flexible) / Full Time', jobCategory: 'Development', escription: 'We are seeking a talented Front-end Developer to join our creative team. The ideal candidate will have a strong understanding of modern web technologies and a passion for creating engaging user experiences.' },
  { id: 2, jobTitle: 'UX/UI Designer', jobType: 'Remote / Full Time', jobCategory: 'Design', jobDescription: 'We\'re looking for a skilled UX/UI Designer to help shape the future of our digital products. The successful candidate will have a keen eye for design and a user-centered approach to problem-solving.' },
  { id: 3, jobTitle: 'Digital Marketing Specialist', jobType: 'London / Full Time', jobCategory: 'Marketing', jobDescription: 'We are hiring a Digital Marketing Specialist to drive our online presence and lead generation efforts. The ideal candidate will have experience in SEO, social media marketing, and content creation.' },
];

export default function JobListings() {
  const [openRoles, setOpenRoles] = useState(true);
  const [expandedRole, setExpandedRole] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobListings, setJobListings] = useState([]);

  
  const toggleRoles = () => setOpenRoles(!openRoles);
  const toggleRole = (id) => setExpandedRole(expandedRole === id ? null : id);
  
  const[isLocked,toggle]=UseBodyScrollLock();


    const openModal = () => {
      setIsModalOpen(true);
      toggle(true); // Lock scroll
    };

    const closeModal = () => {
      setIsModalOpen(false);
      toggle(false); // Unlock scroll
    };


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}jobs/getalljobs`); 
        const data = await response.json();
        setJobListings(data);
        console.log(data);
        
      } catch (error) {
        console.error('Error fetching job listings:', error);
      }
    };
  
    fetchJobs();
  }, []);                            
  

 

  const filteredJobs = 
  activeFilter === 'All' 
    ? jobListings 
    : jobListings.filter((job) => job.jobCategory.toLowerCase() === activeFilter.toLowerCase());

  

  return (
    <div className="job-listings  bg-black text-white mt-20 sm:py-6 px-8 sm:px-14 md:px-20 lg:px-24 xl:px-32 lg:space-y-14 font-sans">
      <div className=' flex flex-col sm:flex cOne:flex-row cOne:gap-x-48 min-w-screen'>
        <div className='flex felx-row justify-between gap-15 job-opening-top pt-3'>
          <h1 className="openings-header ppbook text-largeHeader">JOIN&nbsp;OUR<br
          />TEAM</h1>
          <div className='inline-block cOne:hidden mt-4'>
            <div className="flex items-center rounded-md border text-sm border-white py-1 px-2 mr-2 mb-2" >
              OPEN ROLES
              <ChevronDown className='w-4 h-4 ml-2' />
            </div>
          </div>
        </div>
       
          <p className="flex flex-wrap text-base md:text-md lg:text-lg  pb-10 pt-6 md:pt-5   sm:cols-4 md:gap-x-48 opening-description text-sub-head-color custom-padding">
            Begin your career journey with us, where we challenge boundaries and redefine technology. Together, we will develop innovative solutions and create a meaningful impact in the digital landscape. Your future starts here!
          </p>
       
      </div>
      {openRoles && (
        <div className='rounded-3xl'>
          <div className="flex justify-center sm:justify-start px-4  md:hidden gap-2 sm:gap-2.5 mb-4 filter-btn pb-4">
            {/* {['All', 'Design', 'Development', 'Marketing','Accounts','human resourse','staff'].map((filter) => ( */}
            {['All', 'Design', 'Development', 'Marketing'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                id='job-opening-btn'
                className={`rounded-lg text-sm sm:text-lg  py-1.5 px-2.5  sm:py-2 sm:px-4  cursor-pointer bg-jobFilter font-ppnue ${activeFilter === filter ? 'bg-white text-black' : 'bg-jobFilter text-white'}`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className='border rounded-2xl sm:rounded-3xl bg-openingsBg' style={{ borderColor: ' #444444' }}>
            <div className="px-8 pt-8  justify-start gap-10 sm:gap-2.5 mb-4 filter-btn hidden md:flex">
              {/* {['All', 'Design', 'It', 'Marketing','Accounts','human resourse','staff'].map((filter) => ( */}
                {['All', 'Design', 'Development', 'Marketing'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  id='job-opening-btn'
                  className={`font-ppnue rounded-xl  lg:px-10 lg:py-4 text-sm sm:text-lg  py-2 px-2  md:py-3 md:px-4  cursor-pointer ${activeFilter === filter ? 'bg-white text-black' : 'bg-jobFilter text-btn'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className='p-2'>
              {filteredJobs.map((job, index) => (
                <div key={job.id} className="border-gray-600 apply-container py-3 rounded-3xl lg:px-3  sm:px-2 sm:py-5 px-3 p-3">
                  <div
                    className="flex flex-row sm:flex-row justify-between  py-1 px-2 sm:p-4 lg:px-4 lg:py-5 cursor-pointer"
                    onClick={() => toggleRole(job._id)}
                  >
                    <div className='flex flex-col sm:hidden'>
                      <h3 className="font-semibold text-md sm:text-md md:text-lg text-largeHeader">{job.jobTitle}</h3>
                      <p className="text-xs sm:text-base md:text-md text-sub-head-color">{job.jobType}</p>
                    </div>

                    <div className='sm:flex-1 hidden sm:block'>
                      <h3 className="font-semibold text-md sm:text-md md:text-xl text-largeHeader">{job.jobTitle}</h3>
                    </div>
                    <div className='sm:flex-1 hidden sm:block'>
                      <p className=" text-xs sm:text-base md:text-md text-sub-head-color">{job.jobType}</p>
                    </div>

                    <div>
                      {expandedRole === job._id ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                  {expandedRole === job._id && (
                    <div className="p-2 sm:p-4  rounded-md" style={{ backgroundColor: '161616E3' }}>
                        <p className="jobDescription_Style text-sm sm:text-md md:text-lg leading-relaxed pb-1 sm:pb-3" dangerouslySetInnerHTML={{ __html: job.jobDescription }}></p>
                      {/* <div>
                        set
                      </div> */}
                      <button className="bg-black text-white rounded-lg border border-gray-400 py-1 px-2 mt-2 sm:py-2 sm:px-4" onClick={openModal}>Apply Now</button>
                      <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <JobApplicationForm Job={job.JobTitle} onClose={closeModal} />
                      </Modal>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


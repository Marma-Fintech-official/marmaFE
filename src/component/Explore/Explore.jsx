
  const events = [
    {
      id: 1,
      title: 'Scaling Ethereum - Mastering Layer 2 Technologies',
      description: 'In this workshop, we will explore the challenges and solutions related to  scaling Ethereum, one of the most critical aspects of blockchain development today.',
      date: "OCT 17'th 2024",
      image: '',
      alt: 'the event image name',
    },
    {
      id: 2,
      title: 'Scaling Ethereum - Mastering Layer 2 Technologies',
      description: 'In this workshop, we will explore the challenges and solutions related to scaling Ethereum, one of the most critical aspects of blockchain development today.',
      date: "OCT 17'th 2024",
      image: '/images/event.png',
      alt: 'the event image name',
    },
  ];





import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './Explore.css';


// EventCard Component
const EventCard = ({ event }) => (
  <div className="md:grid-cols-12 py-5 flex flex-row align-middle  min-h-30 sm:flex-row gap-2 items-stretch space-y-0 sm:space-y-0 ">
    <div className="pt-2 rounded-lg flex-shrink-0 md:cols-span-6">
      <img
        src={event.image || '/images/event/event-img.avif'}
        alt={`${event.title}-image`}
        className="event-image"
      />
    </div>
    <div className="flex flex-col justify-center gap-7 sm:inline-flex pl-3 md:cols-span-2">
      <h3
        className="text-white font-light event-title-class"
        style={{ fontWeight: '500', lineHeight: '29px' }}
      >
        {event.title}
      </h3>
      <p className="text-gray-400 text-md md:text-md hidden jb:block event-description max-w-[calc(100%-50px)]">
        {event.description}
      </p>
      <div className="flex flex-col-reverse jb:hidden">
        <span
          className="inline-block mt-4 flex-row eventdate"
          style={{ display: 'list-item', marginLeft: '15px' }}
        >
          {new Date(event.eventDate).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          })}
        </span>
        <div className="flex justify-start">
          <a href={event.link} target="_blank" rel="noopener noreferrer" className="register-btn py-0.5">
            Register
            <ArrowUpRight className=" pl-2 pt-0.5" />
          </a>
        </div>
      </div>
    </div>
    <div className="hidden sm:flex-col jb:block register-container md:cols-span-4">
      <span className="block flex-row eventdate-l">
        {new Date(event.eventDate).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })}
      </span>
      <a href={event.link} target="_blank" rel="noopener noreferrer" className="register-btn">
        Register
        <ArrowUpRight className="h-4" />
      </a>
    </div>
  </div>
);


export default function ExploreLatest() {

  const staticsetEvents = [
    {
      id: 1,
      title: 'Scaling Ethereum - Mastering Layer 2 Technologies',
      description: 'In this workshop, we will explore the challenges and solutions related to  scaling Ethereum, one of the most critical aspects of blockchain development today.',
      date: "OCT 17'th 2024",
      image: '/images/event.png',
      alt: 'the event image name',
    },
    {
      id: 2,
      title: 'Scaling Ethereum - Mastering Layer 2 Technologies',
      description: 'In this workshop, we will explore the challenges and solutions related to scaling Ethereum, one of the most critical aspects of blockchain development today.',
      date: "OCT 17'th 2024",
      image: '/images/event.png',
      alt: 'the event image name',
    },
    {
      id: 3,
      title: 'Scaling Ethereum - Mastering Layer 2 Technologies',
      description: 'In this workshop, we will explore the challenges and solutions related to scaling Ethereum, one of the most critical aspects of blockchain development today.',
      date: "OCT 17'th 2024",
      image: '/images/event.png',
      alt: 'the event image name',
    },
    {
      id: 4,
      title: 'Scaling Ethereum - Mastering Layer 2 Technologies',
      description: 'In this workshop, we will explore the challenges and solutions related to scaling Ethereum, one of the most critical aspects of blockchain development today.',
      date: "OCT 17'th 2024",
      image: '/images/event.png',
      alt: 'the event image name',
    },
  ];

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  console.log(currentPage);
  

  console.log(events,'total events');
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://ec2-18-214-60-96.compute-1.amazonaws.com:7001/event/upcoming?page=${currentPage}`);
        const data = await response.json();
        if (data && data.events) {
          setEvents(data.events);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentPage]);

  

 

  return (
    <div className="bg-black min-h-[70vh] h-70 rounded-lg mt-20 px-10 sm:py-6 sm:px-14 md:px-20 lg:px-24 xl:px-32" id="event">
      <div>
        <div className="flex flex-col cOne:flex-row sm:items-start mb-8 space-y-4 sm:space-y-5 cOne:gap-x-48">
          <h2 className="openings-header sm:w-1/3 h-1/3 text-largeHeader">
            EXPLORE&nbsp;&nbsp;THE<br />
            LATEST
          </h2>
          <p className="text-base md:text-md lg:text-lg mt-40 sm:mt-0 text-sub-head-color custom-padding">
            MARMA FINTECH develops a dynamic workspace with events like workshops, team-building activities,
            and celebration gatherings that inspire collaboration, growth, and connection.
          </p>
        </div>

        {loading ? (
          <p className="text-gray-400 text-center">Loading events...</p>         
        ) : (
          <div className="space-y-6 main-wrapper-explore">
            {events.length > 0 ? (
              events.map((event) => <EventCard key={event._id} event={event} />)
            ) : (
              <p className="text-gray-400 text-center">There is no upcoming event.</p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end mt-4 space-x-2">
          <div>
            <button
              onClick={() => setCurrentPage(1)}
              className={`px-3 py-1 sm:px-4 sm:py-1 md:px-4 md:py-2 rounded-md border border-gray-500 ${currentPage === 1 ? 'bg-gray-300 text-black' : 'bg-black text-gray-300'}`}
            >
              1
            </button>
          </div>
          <div> 
            <button
              onClick={() => setCurrentPage(2)}
              className={`px-3 py-1 sm:px-4 sm:py-1 md:px-4 md:py-2 rounded-md border border-gray-500 ${currentPage === 2 ? 'bg-gray-300 text-black' : 'bg-black text-gray-300'}`}
            >
               2
            </button>
          </div>
        </div>
    </div>
  );
}

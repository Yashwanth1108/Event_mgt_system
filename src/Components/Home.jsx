import React, { useEffect, useState, useMemo } from 'react';
import '../App.css'; 

const Home = () => {
  const [userdata, setuserdata] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage, setItemsPerPage] = useState(3); 
  useEffect(() => {
    const fetchuserId = () => {
      fetch('http://localhost:5000/events')
        .then((resp) => resp.json())
        .then((data) => {
          setuserdata(data);
          console.log(data);
        });
    };
    fetchuserId();
  }, []); 
  const filteredData = selectedCategory
    ? userdata.filter((event) => event.category === selectedCategory)
    : userdata;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  const handleBooking = (id) => {
    setuserdata((prevData) =>
      prevData.map((event) => {
        if (event.id === id) {
          if (event.availableSeats > 0) {
            return { ...event, availableSeats: event.availableSeats - 1 };
          } else {
            alert('This event is fully booked!');
            return event;
          }
        }
        return event;
      })
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="container">
      <h1>Event Booking System</h1>

      <div className="filter-container">
        <label htmlFor="category-filter">Filter by Category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
           <option value="">All</option>
          <option value="Music">Music</option>
          <option value="Technology">Technology</option>
          <option value="Art">Art</option>
          <option value="Food">Food</option>
          <option value="Film">Film</option>
        </select>
      </div>

      <div className="event-list">
        {paginatedData.map((data) => {
          const { id, title, description, category, date, availableSeats, price } = data;
          return (
            <div className="event-item" key={id}>
              <h2>{id} {title}</h2>
              <p>Description: {description}</p>
              <p>Category: {category}</p>
              <p>Date: {date}</p>
              <p>Available Seats: {availableSeats}</p>
              <p>Price: ${price}</p>
              <button onClick={() => handleBooking(id)} disabled={availableSeats === 0}>
                {availableSeats === 0 ? 'Fully Booked' : 'Book Seats'}
              </button>
              {availableSeats === 0 && <p style={{ color: 'red' }}>This event is fully booked!</p>}
            </div>
          );
        })}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;

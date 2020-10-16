import React, { useEffect, useState } from 'react';
import JobTile from './JobTile'
import { Redirect } from 'react-router-dom'
import AuthService from '../services/authService';
import authHeader from '../services/authHeader';
import styles from '../assets/styles/JobList.module.css'

const JobList = () => {

  const [jobs, setJobs] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetch('https://microverse-jobs-api.herokuapp.com/api/v1/jobs', { headers: authHeader() })
      .then((res) => res.json())
      .then(data => setJobs(data))
  }, [])

  const user = AuthService.getCurrentUser();

  if (!user) return <Redirect to="/signin" />

  const prevSlide = () => {
    const lastIndex = jobs.length - 1;
    const shouldResetIndex = currentIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentIndex - 1;

    setCurrentIndex(index);
  }

  const nextSlide = () => {
    const lastIndex = jobs.length - 1;
    const shouldResetIndex = currentIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentIndex + 1;

    setCurrentIndex(index);
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <i className="fas fa-angle-left" onClick={prevSlide}></i>
        <div className={styles.carousel}>
          <JobTile key={currentIndex} job={jobs[currentIndex]} />
        </div>
        <i className="fas fa-angle-right" onClick={nextSlide}></i>
      </div>
      <div className={styles.counter}>{`${currentIndex + 1}/${jobs.length}`}</div>
    </div>
  )

}

export default JobList;
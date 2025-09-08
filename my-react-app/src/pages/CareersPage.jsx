
import { useState } from "react";
import jobs from "../data/jobsData";
import JobCard from "../components/JobCard";
import barabariLogo from "../assets/logo.jpg";


export default function CareersPage() {

  const [searchTerm, setSearchTerm] = useState("");  
  const [selectedFilters,setSelectedFilters]= useState({
      department: [],
      location:[],
      level: [],
  });


   //toggle filter
    const toggleFilter = (type,value)=>{
        setSelectedFilters((prev)=>{
           const alreadySelected = prev[type].includes(value);
           return {
             ...prev,
             [type]: alreadySelected
             ? prev[type].filter((v)=> v!== value)
             :[...prev[type],value],
           };
        });
    };



   //reset button
   const resetFilters = () => {
    setSelectedFilters({ department: [], location: [], level: [] });
    setSearchTerm("");
  };








  const filteredJobs = jobs.filter((job) => {
       //search filter
       const matchesSearch =job.title.toLowerCase().includes(searchTerm.toLowerCase());
       //department filters
       const matchesDepartment=
       selectedFilters.department.length===0 ||
       selectedFilters.department.includes(job.department);
       //location filter
       const matchesLocation=
       selectedFilters.location.length===0 ||
       selectedFilters.location.includes(job.location);
       //level filter
       const matchesLevel=
       selectedFilters.level.length===0 ||
       selectedFilters.level.includes(job.level);

       return matchesSearch && matchesDepartment && matchesLocation && matchesLevel;
  });


  const jobsToDisplay =searchTerm || selectedFilters.department.length> 0 || selectedFilters.location.length> 0 || selectedFilters.level.length>0
   ? filteredJobs
   : jobs.slice(0,3);


  return (
    <main className="page page-careers">
      <img src={barabariLogo} alt="Barabari Logo" className="brand-logo" />
      <p className="goal">Taleem. Tajurba. Taakat.</p>
      <h1 className="brand">Join Barabari</h1>
      <p className="work">We’re a tech & design partner. Build products that matter.</p>
      <div className="careers-layout">
        <aside className="filters-panel">
          <h3>Filters</h3>
          <div className="filter-group">
            <h4>Department</h4>
            <button onClick={()=> toggleFilter("department","Engineering")}>Engineering</button>
            <button onClick={()=> toggleFilter("department","Design")}>Design</button>
            <button onClick={()=> toggleFilter("department","Product")}>Product</button>
            <button onClick={()=> toggleFilter("department","Operation")}>Operations</button>
          </div>
          <div className="filter-group">
            <h4>Location</h4>
            <button onClick={()=> toggleFilter("location","Hyderabad (IN)")}>Hyderabad (IN)</button>
            <button onClick={()=> toggleFilter("location","Remote (IN)")}>Remote (IN)</button>
          </div>
          <div className="filter-group">
            <h4>Level</h4>
            <button onClick={()=> toggleFilter("level","Intern")}>Intern</button>
            <button onClick={()=> toggleFilter("level","Junior")}>Junior</button>
            <button onClick={()=> toggleFilter("level","Mid")}>Mid</button>
            <button onClick={()=> toggleFilter("level","Senior")}>Senior</button>
          </div>

          <button className="reset-btn" onClick={resetFilters}>Reset Filters</button>
        </aside>
        <section className="jobs-panel">
          <div className="search-bar">
            <input type="text"
              placeholder="Search jobs (e.g. React,Design)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")}>clear</button>
            )}
          </div>
          <div className="jobs-list">
            {jobsToDisplay.length > 0 ? (
              jobsToDisplay.map((j) => <JobCard key={j.id} job={j} />)
            ) : (
              <p>No jobs found for "{searchTerm}"</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

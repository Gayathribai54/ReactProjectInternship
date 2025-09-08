import { Link } from "react-router-dom";
import { useState } from "react";




export default function JobCard({ job }) {
  return (
    <article className="job-card">
      <h3>{job.title}</h3>
      <p className="meta">{job.location} • {job.level}</p>
      <p className="summary">{job.summary}</p>
      <div className="tags">
        {job.tags.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
      <Link to={`/careers/${job.id}`} className="btn-primary">View</Link>
    </article>
  );
}


export function JobDetailCard({ job }) {


  //application form
  const [showForm, setShowForm] = useState(false);

  //Submission state
  const [submitted, setSubmitted] = useState(false);

  //storing form values 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    resume: null,
    coverLetter: "",
    location: "",
    noticePeriod: ""
  });


  //storing error values


  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };













  //validating  details
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Please enter a valid email.";
    if (!formData.phone.match(/^\d{10}$/))
      newErrors.phone = "Phone number must be 10 digits.";
    if (!formData.portfolio.match(/^https?:\/\/.+/))
      newErrors.portfolio = "Please enter a valid URL starting with http(s).";
    if (!formData.resume)
      newErrors.resume = "Please upload your resume.";
    if (!formData.coverLetter.trim())
      newErrors.coverLetter = "Cover letter is required.";
    if (!formData.location)
      newErrors.location = "Please select a location.";
    if (!formData.noticePeriod)
      newErrors.noticePeriod = "Please select a notice period.";

    return newErrors;
  };



  //handling submission

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // show errors
    } else {
      setErrors({});

      // 1. Load old applications
      const applications =
        JSON.parse(localStorage.getItem("applications")) || [];

      // 2. Add new application
      applications.push({
        jobId: job.id,
        ...formData,
        resume: formData.resume
          ? formData.resume.name || formData.resume
          : null,
        submittedAt: new Date().toISOString(),
      });

      // 3. Save back to localStorage
      localStorage.setItem("applications", JSON.stringify(applications));


      // 4. Flip UI to success message
      setSubmitted(true);  //show success
    }
  };







  return (
    <div className="job-detail-card">
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <h3>Responsibilities</h3>
      <ul>
        {job.responsibilities?.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
      <h3>Requirements</h3>
      <ul>
        {job.requirements?.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
      <h3>About Barabari</h3>
      <p>{job.aboutCompany}</p>
      <button className="Apply"
        onClick={() => setShowForm(!showForm)}
      >{showForm ? "close Application" : "Apply"}</button>
      <div className={`Application-card ${showForm ? "show" : ""}`}>
        {submitted ? (
          <div className="success-message">
            <h3>Application received 🎉</h3>
            <p>Thanks for applying to {job.title}.we'll get back to you soon.</p>
            <Link to="/careers" className="btn-secondary">Back to Careers</Link>
          </div>
        ) : (
          <form className="application" onSubmit={handleSubmit}>
            <div>
              <label>Full Name: <input type="text" placeholder="Enter your full name" onChange={handleChange} name="name"
                value={formData.name} /></label>
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div>
              <label>Email:<input type="email" placeholder="enter your email id" onChange={handleChange} name="email"
                value={formData.email} /></label>
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div>
              <label>Phone:<input type="tel" placeholder="enter your phone number" onChange={handleChange} name="phone"
                value={formData.phone} /></label>
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
            <div>
              <label>
                Portfolio:
                <input type="url" placeholder="https://yourportfolio.com" onChange={handleChange} name="portfolio"
                  value={formData.portfolio} />
              </label>
              {errors.portfolio && <p className="error">{errors.portfolio}</p>}
            </div>
            <div>
              <label>
                Resume:
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleChange} name="resume" />
              </label>
              {errors.resume && <p className="error">{errors.resume}</p>}
            </div>
            <div>
              <label>
                Cover Letter:
                <textarea placeholder="Write your cover letter here" onChange={handleChange} name="coverLetter"
                  value={formData.coverLetter}></textarea>
              </label>
              {errors.coverLetter && <p className="error">{errors.coverLetter}</p>}
            </div>
            <div>
              <label>
                Preferred Location:
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                >
                  <option value="">Select location</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Remote">Remote</option>
                </select>
              </label>
              {errors.location && <p className="error">{errors.location}</p>}
            </div>
            <div>
              <label>
                Notice Period:
                <select
                  name="noticePeriod"
                  value={formData.noticePeriod}
                  onChange={handleChange}
                >
                  <option value="">Select notice period</option>
                  <option value="Immediate">Immediate</option>
                  <option value="15 days">15 days</option>
                  <option value="30 days">30 days</option>
                  <option value="60 days">60 days</option>
                </select>
              </label>
              {errors.noticePeriod && <p className="error">{errors.noticePeriod}</p>}
            </div>
            <div className="actions">
              <button className="submit">Submit</button>
              <Link to="/careers" className="btn-secondary">Cancel</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
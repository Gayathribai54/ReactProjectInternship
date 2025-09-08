import { useParams, Link } from "react-router-dom";
import jobs from "../data/jobsData";
import { JobDetailCard } from "../components/JobCard"; 


export default function JobDetailPage() {
  const { jobId } = useParams();
  const job = jobs.find((j) => String(j.id) === jobId);

  if (!job) {
    return (
      <main className="page">
        <Link to="/careers">← Back to Careers</Link>
        <h2>Job not found</h2>
      </main>
    );
  }

  return (
    <main className="page">
      <Link to="/careers">← Back to Careers</Link>
      <JobDetailCard job={job} />
    </main>
  );
}
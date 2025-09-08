I built a small career/job application portal using React.
The app lets users search and filter jobs, view details, and apply for them with a form that validates inputs and stores submissions locally.

Used React Router (Link, NavLink, useParams) for page navigation.

Used state with useState to track form fields, search input, filters, and submission messages.

Passed data as props into reusable components like job cards and detail pages.

Made the form controlled and added validation for required fields, email, and resume upload.

Added a debounce on the search bar so jobs filter only after typing stops briefly.

Stored job data and applications in localStorage so they stay after refresh.

Applied array methods like .map(), .filter(), .find() for job rendering and filtering.

Styled with CSS Flexbox and media queries to keep the layout responsive.

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Second Serve. All rights reserved.</p>
        <p className="mt-2">
          Follow us on{" "}
          <a href="https://x.com/Shubham70712329" target="_blank" rel="noopener noreferrer" className="text-blue-400">Twitter</a>,{" "}
          <a href="https://www.facebook.com/profile.php?id=61571586376740" target="_blank" rel="noopener noreferrer" className="text-blue-400">Facebook</a>, and{" "}
          <a href="https://www.instagram.com/_shubh_.am/" target="_blank" rel="noopener noreferrer" className="text-blue-400">Instagram</a>.
        </p>
        <p className="mt-2">
          Contact us at <a href="mailto:shubhh.ab@gmail.com" className="text-blue-400">info@secondserve.com</a>
        </p>
        <p className="mt-2">
          Visit our <a href="https://www.secondserve.com" target="_blank" rel="noopener noreferrer" className="text-blue-400">website</a> for more information.
        </p>
        {/* <p className="mt-2">
          Follow our blog for updates and news.
        </p>
        <p className="mt-2">
          Subscribe to our newsletter for the latest updates.
        </p>
        <p className="mt-2">
          Join our community for discussions and support.
        </p>
        <p className="mt-2">
          Check out our FAQs for more information.
        </p> */}
        <p className="mt-2">
          <a href="https://www.secondserve.com/faqs" target="_blank" rel="noopener noreferrer" className="text-blue-400">FAQs</a>
        </p>   
      </div>
    </footer>
  );
}
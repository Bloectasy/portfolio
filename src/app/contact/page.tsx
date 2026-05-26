import Navigation from '@components/Navigation';
import Footer from '@components/Footer';
import ContactInfo from '@components/ContactInfo';

const Contact = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <ContactInfo />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

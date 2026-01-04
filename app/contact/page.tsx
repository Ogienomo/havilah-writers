export default function ContactPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* INTRO */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Have a project in mind or need a custom quote? Share your details below and a
          member of the Havilah Writers team will reach out within 24 hours.
        </p>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-16">
        {/* LEFT: CONTEXT */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Let’s Talk About Your Project</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We work with students, professionals, entrepreneurs, and authors across a
            wide range of disciplines. Every inquiry is treated with confidentiality and
            care.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            For pricing clarity and accurate timelines, please provide as much detail as
            possible in the request form. This allows us to assess scope, complexity, and
            delivery requirements properly.
          </p>

          <div className="mt-10 space-y-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">havilahlearninghub@gmail.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Response Time</p>
              <p className="font-medium">Within 24 hours</p>
            </div>
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="border rounded-2xl p-6">
          <iframe
            src="https://form.jotform.com/243364075001042"
            title="Havilah Writers Service Request Form"
            className="w-full h-[700px] border-0"
          />
        </div>
      </section>

      {/* ASSURANCE */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Commitment to You</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            All projects are handled with originality, confidentiality, and professionalism.
            We do not recycle content or compromise academic and ethical standards.
          </p>
        </div>
      </section>
    </main>
  );
}

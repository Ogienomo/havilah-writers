export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Havilah Writers</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Havilah Writers is a professional writing and research consultancy committed to
          excellence, originality, and clarity. We support students, professionals, and
          organizations with carefully structured, high-quality written work.
        </p>
      </section>

      {/* MISSION */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our mission is to help individuals and organizations communicate ideas with
              clarity, confidence, and credibility. We believe that strong writing is not
              merely about words, but about structure, evidence, and thoughtful expression.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every project we undertake is approached with academic rigor, ethical
              responsibility, and respect for originality.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">What We Stand For</h2>
            <ul className="space-y-4 text-gray-600">
              <li>
                <strong className="text-gray-900">Originality:</strong> All work is crafted
                from scratch and tailored to the client’s objectives.
              </li>
              <li>
                <strong className="text-gray-900">Confidentiality:</strong> Client information
                and project details are handled with strict discretion.
              </li>
              <li>
                <strong className="text-gray-900">Quality:</strong> We prioritize depth,
                accuracy, and coherence over speed or volume.
              </li>
              <li>
                <strong className="text-gray-900">Integrity:</strong> Our services align with
                academic and professional standards.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Approach</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="border rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">Understanding the Brief</h3>
            <p className="text-gray-600 leading-relaxed">
              We begin every engagement by carefully reviewing the client’s requirements,
              expectations, and constraints to ensure alignment from the start.
            </p>
          </div>
          <div className="border rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">Research & Development</h3>
            <p className="text-gray-600 leading-relaxed">
              Our writers and researchers conduct thorough research, ensuring arguments are
              well-supported, relevant, and academically sound.
            </p>
          </div>
          <div className="border rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">Refinement & Delivery</h3>
            <p className="text-gray-600 leading-relaxed">
              Each project undergoes careful review and refinement before delivery, ensuring
              clarity, consistency, and professionalism.
            </p>
          </div>
        </div>
      </section>

      {/* CREDIBILITY */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Clients Choose Us</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            Clients choose Havilah Writers for our disciplined approach, transparent
            communication, and commitment to delivering work that meets high academic and
            professional standards.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 border rounded-2xl">
              <h3 className="text-xl font-semibold mb-3">Experienced Professionals</h3>
              <p className="text-gray-600">
                Our team consists of experienced writers and researchers across diverse
                academic and professional fields.
              </p>
            </div>
            <div className="p-8 border rounded-2xl">
              <h3 className="text-xl font-semibold mb-3">Tailored Solutions</h3>
              <p className="text-gray-600">
                Every project is customized to reflect the client’s unique goals and
                requirements.
              </p>
            </div>
            <div className="p-8 border rounded-2xl">
              <h3 className="text-xl font-semibold mb-3">Timely Delivery</h3>
              <p className="text-gray-600">
                We respect deadlines and maintain open communication throughout the process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold mb-6">Let’s Work Together</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Whether you are pursuing academic success or professional growth, Havilah Writers
          is ready to support you with reliable, high-quality writing services.
        </p>
        <a
          href="/contact"
          className="inline-block bg-black text-white px-10 py-4 rounded-xl text-lg hover:bg-gray-800 transition"
        >
          Contact Us
        </a>
      </section>
    </main>
  );
}

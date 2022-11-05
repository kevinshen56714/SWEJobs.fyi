import Head from 'next/head'

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About Us | SWEJobs.fyi</title>
      </Head>
      <div className="flex items-center justify-center gap-1">
        <article className="prose lg:prose-xl">
          <h3 className="self-center text-center text-xl">For engineers, by engineers</h3>
          <p className="mb-2 text-center text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo quis nunc
            aliquam efficitur ut ut tellus. Fusce mattis eu mi sit amet egestas. Mauris eu tristique
            ex, a interdum leo. Vestibulum suscipit viverra convallis. Aliquam urna purus, dignissim
            sit amet maximus et, mattis in sem.
          </p>
        </article>
      </div>
      <br />
      <div className="flex items-center justify-center">
        <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl">
          <div className="px-6 py-4">
            <div className="mb-2 text-xl font-bold">About Us</div>
            <p className="text-base text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
              Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
            <p className="text-base text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
              Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
            <p className="text-base text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
              Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export const Title = (props: { currentPath: string }) => {
  const [_, parentPath, currentPage] = props.currentPath.split('/')
  const title = {
    'about-data': 'About Data',
    'about-us': 'About Us',
  }

  return (
    <div className="bg-gray-50 py-6 text-gray-900 shadow-sm sm:py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-12 lg:px-5">
        <div className="text-xl sm:text-2xl">{title[currentPage]}</div>
      </div>
    </div>
  )
}

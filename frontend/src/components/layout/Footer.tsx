const Footer = () => {
  return (
    <div className="w-full flex justify-center text-[11px]">
      This is a&nbsp;
      <a
        href="https://github.com/nils-roemer/bereal-tools"
        className="text-blue-300 dark:text-blue-500 hover:underline"
      >
        student project
      </a>
      &nbsp;and not affiliated with BeReal.&nbsp;
      <a
        href="/imprint"
        className="text-blue-300 dark:text-blue-500 hover:underline"
      >
        Imprint
      </a>
    </div>
  )
}

export default Footer

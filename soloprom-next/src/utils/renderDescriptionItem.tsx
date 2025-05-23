import Image from 'next/image'

export const renderDescriptionItem = (
  name: string,
  value: string | number | undefined,
  unit?: string,
  imgName?: string,
) => {
  if (value === undefined || value === null) return null
  return (
    <div className="flex items-center justify-between border-b border-grayColor pb-1 text-sm [&:not(:last-child)]:mb-1.5">
      <div className="">{name}</div>
      <div className="flex items-center font-bold">
        {imgName ? (
          <Image
            src={`/img/country/${imgName}.jpg`}
            className="mr-1 h-2.5 w-5"
            width={20}
            height={10}
            alt={imgName}
          />
        ) : (
          ''
        )}
        <span className="leading-none">
          {value}
          {unit || ''}
        </span>
      </div>
    </div>
  )
}

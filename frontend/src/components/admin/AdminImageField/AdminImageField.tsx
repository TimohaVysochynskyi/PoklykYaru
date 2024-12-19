import { PaperClipIcon } from "@heroicons/react/20/solid";

type Props = {
  image: string;
};

export default function AdminImageField({ image }: Props) {
  const parseImageName = (path: string) => {
    const pathArray = path.split("/");
    const imageArray = pathArray[pathArray.length - 1].split("_");
    return imageArray[imageArray.length - 1];
  };

  return (
    <>
      <div className="flex w-0 flex-1 items-center">
        <PaperClipIcon className="h-5 w-5 shrink-0 text-gray-400" />
        <div className="ml-4 flex min-w-0 flex-1 gap-2">
          <span className="truncate font-medium">{parseImageName(image)}</span>
        </div>
      </div>
      <div className="ml-4 shrink-0">
        <a
          href={`http://${image}`}
          target="_blank"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Подивитися
        </a>
      </div>
    </>
  );
}

import { IoPause, IoPlay } from "react-icons/io5";
import Image from "next/image";

function Album(props) {
  const { album } = props;

  const image = album.images[0];

  return (
    <>
      <div
        className="w-[200] h-[200] rounded-lg overflow-hidden relative text-white
            cursor-pointer hover:scale-105 hover:text-white/100 transition
            duration-200 ease-out group-mx-auto space-y-5 top-1.5
        "
      >
        <Image
          src={image.url}
          alt=""
          height={image.height}
          width={image.width}
          className="inset-0 object-cover w-full h-full rounded-none group-hover:opacity-100"
        />

        <div className="absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5">
          <div
            className="h-10 w-10 bg-[#42cbcf] rounded-full flex items-center justify-center
        group-hover:bg-[#42cbcf] flex-shrink-0"
          >
            <IoPlay className="text-l ml-[1px]" />
          </div>
          <div>
            <h2 className="text-[20px] uppercase rounded-full">{album.name}</h2>
            <h4 className=" text-[15px] uppercase rounded-full font-extrabold ">
              {album.artists[0].name}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Album;

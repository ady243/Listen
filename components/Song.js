import {IoPlay} from "react-icons/io5";
import {useState} from "react";
import Image from "next/image";

function Song({song}) {

    let [image, setImage] = useState(null);
    // check if image is available and define the image url
    if ('album' in song && 'images' in song.album && song.album.images.length > 0) {
        image = song.album.images[0];
    }

    return (
        <div className="rounded overflow-hidden shadow-lg bg-amber-50">
            {image && (
                <Image
                    src={image.url}
                    alt=""
                    height={image.height}
                    width={image.width}
                    className="w-full"
                />
            )}
            <div className="px-6 py-4">
                <div className="font-bold text-xl text-black mb-2">{song.name}</div>
                <p className="text-gray-700 text-base">
                    {song.artists.map((artist) => artist.name).join(", ")}
                </p>
            </div>
            {/* music player */}
            <div
                className="h-10 w-10 bg-[#42cbcf] rounded-full flex items-center justify-center
    group-hover:bg-[#42cbcf] flex-shrink-0"
            >
                <button>
                    <IoPlay className="text-l ml-[1px]"/>
                </button>
            </div>
            {/*<div className="px-6 pt-4 pb-2">*/}
            {/*    <span*/}
            {/*        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>*/}
            {/*    <span*/}
            {/*        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>*/}
            {/*    <span*/}
            {/*        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>*/}
            {/*</div>*/}
        </div>
    );
}

export default Song;

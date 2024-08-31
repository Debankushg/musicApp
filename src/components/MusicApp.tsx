"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";


interface AudioFile {
    fileUrl: string;
    fileName: string;
    fileSizeMB: number;
    fileImage: string;
    editableFileName: string;
}

const MusicApp: React.FC = () => {
    const [audioList, setAudioList] = useState<AudioFile[]>([]);
    const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
;
    const [isGridView, setIsGridView] = useState<boolean>(false);

    useEffect(() => {
        let currentAudio: HTMLAudioElement | null = null;

        if (currentPlayingIndex !== null) {
            currentAudio = new Audio(audioList[currentPlayingIndex].fileUrl);
            currentAudio.play();


            currentAudio.onended = () => {

                setCurrentPlayingIndex(null);
            };

            return () => {
                currentAudio?.pause();
                currentAudio = null;
            };
        }
    }, [currentPlayingIndex, audioList]);

  

    const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            const url = URL.createObjectURL(file);
            const audio = new Audio(url);

            const newAudio: AudioFile = {
                fileSizeMB: file.size,
                fileUrl: url,
                fileName: file.name, // Original file name
                editableFileName: file.name, // Start with the same name, but allow editing
                fileImage: "",
            };

            setAudioList((prev) => [...prev, newAudio]);
        }
    };



    const handleRenameFile = (index: number, newFileName: string) => {
        setAudioList((prev) =>
            prev.map((audio, i) =>
                i === index ? { ...audio, editableFileName: newFileName } : audio
            )
        );
    };

    const handlePlayPause = (index: number) => {
        if (currentPlayingIndex === index) {
            setCurrentPlayingIndex(null);
        } else {
            setCurrentPlayingIndex(index);
        }
    };

    const handlePlay = (index: number) => {
        setPlayingIndex(index);
        setCurrentPlayingIndex(index); // Correctly set to the index passed in
    };

    const handleNext = () => {
        if (playingIndex !== null && playingIndex < audioList.length - 1) {
            setPlayingIndex(playingIndex + 1);
            setCurrentPlayingIndex(playingIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (playingIndex !== null && playingIndex > 0) { // Corrected boundary condition
            setPlayingIndex(playingIndex - 1);
            setCurrentPlayingIndex(playingIndex - 1);
        }
    };



    function calculateEstimatedTime(fileSizeMB: number, assumedNetworkSpeedMbps: number) {
        const networkSpeedMBps = assumedNetworkSpeedMbps / 8; // Convert Mbps to MBps
        const timeInSeconds = fileSizeMB / networkSpeedMBps;

        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = Math.floor(timeInSeconds % 60);

        return ` ${minutes}: ${seconds} `;
    }






    function truncateSentence(sentence: string) {
        const maxLength = 20;
        if (sentence.length <= maxLength) {
            return sentence;
        } else {
            return sentence.slice(0, maxLength) + '...';
        }
    }



    const handleRename = (index: number, newName: string) => {
        const updatedList = [...audioList];
        updatedList[index].fileName = newName;
        setAudioList(updatedList);
    };


    const toggleView = () => {
        setIsGridView(!isGridView);
    };




    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Music Library</h1>
                <button
                    onClick={toggleView}

                >
                    {isGridView ? <FaList /> : <IoGrid />}
                </button>
            </div>
            <input
                type="file"
                onChange={handleAddFile}
                className="mb-4 p-2 w-full text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                accept="audio/*"
            />

            {/* List View */}
            {!isGridView && (
                <ul className="w-full">
                    <li className="flex justify-between items-center p-3 border-b border-gray-700">
                        <div className="flex items-center w-1/3">
                            <span className="w-8 text-center">S.No</span>
                            <div className="ml-3">
                                <p className="font-semibold">Name</p>
                            </div>
                        </div>
                        <p className="w-12 text-center">Image</p>
                        <p className="w-1/3 text-center">Actions</p>
                    </li>
                    {audioList.map((audio, index) => (
                        <li key={index} className="flex justify-between items-center p-3 border-b border-gray-700">
                            <div className="flex items-center w-1/3">
                                <span className="w-8 text-center">{index + 1}</span>
                                <div className="ml-3">
                                    <input
                                        type="text"
                                        value={audio.editableFileName}
                                        onChange={(e) => handleRenameFile(index, e.target.value)}
                                        className="font-semibold bg-transparent border-none outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white p-2 focus:text-black focus:rounded"
                                    />
                                </div>
                            </div>
                            <Image
                                src={"/song.jpg"}
                                alt={audio.fileName}
                                width={50}
                                height={50}
                                className="rounded-lg w-12 text-center"
                            />
                            <div className="flex items-center gap-4 w-1/3 justify-center">
                                <div
                                    onClick={() => handlePlayPause(index)}
                                    className="cursor-pointer rounded-full bg-green-700 p-2 hover:bg-green-300 transition"
                                >
                                    {currentPlayingIndex === index ? <FaPause /> : <FaPlay />}
                                </div>
                                <p className="text-sm text-gray-400">{calculateEstimatedTime(audio.fileSizeMB, 200000)}</p>
                            </div>
                        </li>
                    ))}
                </ul>

            )}

            {/* Grid View */}
            {isGridView &&

                (<div className='w-full flex justify-between flex-wrap '>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {audioList.map((audio, index) => (
                            <div
                                key={index}
                                className={`bg-gray-800  w-52 h-52 rounded-lg shadow-lg hover:bg-gray-700 cursor-pointer flex flex-col justify-center items-center text-center ${playingIndex === index ? "border-2 border-green-300" : ""
                                    }`}
                                onClick={() => handlePlay(index)}
                            >
                                <Image
                                    src={"/song.jpg"}
                                    alt={audio.fileName}
                                    width={100}
                                    height={100}
                                    className="rounded-lg"
                                />
                                <div
                                    className={`font-semibold break-words overflow-hidden px-2 ${playingIndex === index ? "font-bold text-green-400" : ""
                                        }`}
                                >
                                    {(audio.fileName.length > 20) ? truncateSentence(audio.editableFileName) : audio.editableFileName}
                                </div>
                                <p className={`text-sm text-gray-400 ${playingIndex === index ? " text-green-400" : ""
                                    }`}>{calculateEstimatedTime(audio.fileSizeMB, 200000)}</p>
                            </div>
                        ))}
                    </div>


                    <div>

                        {audioList.map((audio, index) => (
                            playingIndex === index && (
                                <div
                                    key={index}
                                    className="flex flex-col justify-center items-center w-fit h-[300px] bg-gray-800 rounded-lg shadow-lg p-4 transition transform hover:scale-105 mt-4"
                                >
                                    <div className='flex justify-between flex-col'>

                                        <Image
                                            src={"/song.jpg"}
                                            alt={audio.fileName}
                                            width={200}
                                            height={200}
                                            className="rounded-lg"
                                        />
                                        <h1 className="text-white mr-4 break-words overflow-hidden"> {(audio.fileName.length > 20) ? truncateSentence(audio.editableFileName) : audio.editableFileName}</h1>
                                        <p className="text-sm text-white font-bold word-break overflow-hidden" >{calculateEstimatedTime(audio.fileSizeMB, 200000)}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <span
                                            onClick={handlePrevious}
                                            className="cursor-pointer rounded-full p-2 hover:bg-green-800 transition"
                                        >
                                            <MdSkipPrevious />
                                        </span>
                                        <span
                                            onClick={() => handlePlayPause(index)}
                                            className="cursor-pointer rounded-full p-2 bg-green-800 transition"
                                        >
                                            {currentPlayingIndex === index ? <FaPause /> : <FaPlay />}
                                        </span>
                                        <span
                                            onClick={handleNext}
                                            className="cursor-pointer rounded-full p-2 hover:bg-green-800 transition"
                                        >
                                            <MdSkipNext />
                                        </span>
                                        {/* <audio
                                        src={audio.fileUrl}
                                        autoPlay
                                        onEnded={handleNext}
                                    /> */}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>)
            }


        </div>
    );
};

export default MusicApp;

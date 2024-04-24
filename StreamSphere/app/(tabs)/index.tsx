import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, ScrollView, Dimensions, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import VideoPlayer from 'expo-video-player';
import {setStatusBarHidden} from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import {Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler';
import VideoControls from '../videoControls';

const playbackSpeedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

export default function TabOneScreen() {
  const video = React.useRef(null);
  const secondVideo = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [statusSecondVideo, setStatusSecondVideo] = React.useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const scrollViewRef = useRef(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState({});
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [orientation, setOrientation] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart((event) => {
      //get the tap position on X
      const touchX = event.absoluteX;
      let mid = Dimensions.get('screen').width / 2;

      //if tap position is before the mid point, set video back by 10s
      if (touchX < mid) {
        if (video.current) {
          (video.current as any)
            .getStatusAsync()
            .then((status: {positionMillis: number}) => {
              const newPosition = Math.max(status.positionMillis - 10000, 0);
              (video.current as any).setPositionAsync(newPosition);
            });
        }
      }
      //if tap position is before the mid point, set video forward by 10s
      else {
        if (video.current) {
          (video.current as any)
            .getStatusAsync()
            .then(
              (status: {positionMillis: number; durationMillis: number}) => {
                const newPosition = Math.min(
                  status.positionMillis + 10000,
                  status.durationMillis
                );
                (video.current as any).setPositionAsync(newPosition);
              }
            );
        }
      }
    });


    const singleTap = Gesture.Tap().onStart((event) => {
      setShowControls(!showControls);
      // Simulate show/hide controls behavior here
    });
  
    useEffect(() => {
      // Simulate fetching lessons by course
      const fakeLessons = [
        {
          lessonId: '1',
          lessonVideoUrl:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          lessonTitle: 'Lesson 1',
          lessonDescription: 'Introduction to React Native 1',
          videoTotalDuration: '600',
          lessonThumbnailImageUrl: 'https://example.com/thumbnail1.jpg',
        },
        {
          lessonId: '2',
          lessonVideoUrl:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          lessonTitle: 'Lesson 2',
          lessonDescription: 'Introduction to React Native 2',
          videoTotalDuration: '800',
          lessonThumbnailImageUrl: 'https://example.com/thumbnail2.jpg',
        },
        // Add more lessons here
      ];
      setLessons(fakeLessons);
      setSelectedLesson(fakeLessons[0]);
    }, []);
  
    //sets the current time, if video is finished, moves to the next video
    const handlePlaybackStatusUpdate = (status: {
      positionMillis: React.SetStateAction<number>;
      didJustFinish: any;
    }) => {
      setCurrentTime(status.positionMillis);
      if (status.didJustFinish) {
        playNextVideo();
      }
    };
  

    const togglePlayPause = () => {
      if (isPlaying && video.current) {
        (video.current as any).pauseAsync();
      } else if (video.current) {
        (video.current as any).playAsync();
      }
      setIsPlaying(!isPlaying);
    };
  
    const playNextVideo = () => {
      if (currentLessonIndex < lessons.length - 1) {
        setCurrentLessonIndex((prevIndex) => prevIndex + 1);
      }
    };


    const playPreviousVideo = () => {
      if (currentLessonIndex > 0) {
        setCurrentLessonIndex((prevIndex) => prevIndex - 1);
      }
    };
    const togglePlaybackSpeed = () => {
      if (video.current) {
        //gets the next playback speed index
        const nextSpeedIndex = playbackSpeedOptions.indexOf(playbackSpeed) + 1;
        if (nextSpeedIndex < playbackSpeedOptions.length) {
          video.current.setRateAsync(
            playbackSpeedOptions[nextSpeedIndex],
            true
          );
          setPlaybackSpeed(playbackSpeedOptions[nextSpeedIndex]);
        }
        //if the last option i.e. 2x speed is applied. then moves to first option
        else {
          video.current.setRateAsync(playbackSpeedOptions[0], true);
          setPlaybackSpeed(playbackSpeedOptions[0]);
        }
      }
    };
  
    const toggleMute = () => {
      video.current.setIsMutedAsync(isMuted);
      setIsMuted(!isMuted);
    };
  
    const toggleFullscreen = async () => {
      if (!isFullscreen) {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
        );
        setIsFullscreen(true);
      } else {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
        setIsFullscreen(false);
      }
      setOrientation(await ScreenOrientation.getOrientationAsync());
    };
  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
            <Video
             ref={video}
             style={styles.video}
             source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
             useNativeControls
             resizeMode="contain"
             isLooping
            //  onPlaybackStatusUpdate={setStatus}
              // ref={video}
              // source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
              // rate={playbackSpeed}
              // isMuted={isMuted}
              // shouldPlay={isPlaying}
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
              // style={{ flex: 1 }}
            />
          </GestureDetector>
          {showControls && (
            <VideoControls
              onTogglePlayPause={togglePlayPause}
              onPlayPreviousVideo={playPreviousVideo}
              onPlayNextVideo={playNextVideo}
              onToggleMute={toggleMute}
              onTogglePlaybackSpeed={togglePlaybackSpeed}
              onSeek={(value) => {
                video.current.setPositionAsync(+value);
                setCurrentTime(+value);
              }}
              onToggleFullscreen={toggleFullscreen}
              duration={+selectedLesson?.videoTotalDuration}
              currentTime={currentTime}
              rate={playbackSpeed}
              isMuted={isMuted}
              shouldPlay={isPlaying}
              fullScreenValue={isFullscreen}
            />
          )}
      {/* <Video
        ref={video}
        style={styles.video}
        source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={setStatus}
      />
      <View style={styles.buttons}>
        <Button title="Play from 5s" onPress={() => video.current.playFromPositionAsync(5000)} />
        <Button title={status.isLooping ? "Set to not loop" : "Set to loop"} onPress={() => video.current.setIsLoopingAsync(!status.isLooping)} />
      </View>
      <Video
        ref={secondVideo}
        style={styles.video}
        source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={setStatusSecondVideo}
      />
      <View style={styles.buttons}>
        <Button title="Play from 50s" onPress={() => secondVideo.current.playFromPositionAsync(50000)} />
        <Button title={statusSecondVideo.isLooping ? "Set to not loop" : "Set to loop"} onPress={() => secondVideo.current.setIsLoopingAsync(!statusSecondVideo.isLooping)} />
      </View> */}
      <StatusBar style="auto" />
      </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch'
  },
  buttons: {
    margin: 16
  }
});
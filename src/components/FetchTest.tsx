import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from "react-native"

// Define types for the movie data
type MovieData = {
  poster_path?: string
  title: string
  overview: string
}

const FetchTest: React.FC = () => {
  const [movie, setMovie] = useState<MovieData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch("http://<Your-Computer-IP>:3000/movies/550")
      .then((response) => response.json())
      .then((data) => {
        setMovie(data.movie)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Text>Loading...</Text>
  }

  return (
    <ScrollView style={styles.container}>
      {movie && (
        <View>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={styles.image}
          />
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.description}>{movie.overview}</Text>
        </View>
      )}
    </ScrollView>
  )
}

// Define styles with TypeScript types
const styles = StyleSheet.create<{
  container: ViewStyle
  image: ImageStyle
  title: TextStyle
  description: TextStyle
}>({
  container: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
})

export default FetchTest

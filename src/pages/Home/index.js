import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';

import {
  Banner,
  BannerButton,
  Container,
  Input,
  SearchButton,
  SearchContainer,
  SliderMovie,
  Title,
} from './styles';

import { Feather } from '@expo/vector-icons';
import { ActivityIndicator, ScrollView } from 'react-native';
import SliderItem from '../../components/SliderItem';
import api, { key } from '../../services/api';
import { getListMovies, randonMovies } from '../../utils/movie';

function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    const stopRequest = new AbortController();

    async function getMovies() {
      const [nowData, popularData, topData] = await Promise.all([
        api.get("/movie/now_playing", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),

        api.get("/movie/popular", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),

        api.get("/movie/top_rated", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),
      ]);

      if (isActive) {
        const nowList = getListMovies(5, nowData.data.results);
        const popularList = getListMovies(10, popularData.data.results);
        const topList = getListMovies(5, topData.data.results);
        
        setBannerMovie(nowData.data.results[randonMovies(nowData.data.results)])

        setNowMovies(nowList);
        setPopularMovies(popularList);
        setTopMovies(topList);
        setLoading(false);
      }
    }

    getMovies();

    return () => {
      isActive = false;
      stopRequest.abort();
    };
  }, []);

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#fff" />
      </Container>
    );
  }

  return (
    <Container>
      <Header title="My Prime Movies" />

      <SearchContainer>
        <Input
          placeholder="Ex.: Bananas de Pijamas"
          placeholderTextColor="#ddd"
        />

        <SearchButton>
          <Feather name="search" size={30} color="#fff" />
        </SearchButton>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em cartaz</Title>

        <BannerButton activeOpacity={0.9} onPress={() => alert("TESTE")}>
          <Banner
            resizeMethod="resize"
            source={{uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}`}}
          />
        </BannerButton>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtrator={(item) => String(item.id)}
        />

        <Title>Populares</Title>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtrator={(item) => String(item.id)}
        />

        <Title>Mais Votados</Title>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtrator={(item) => String(item.id)}
        />
      </ScrollView>
    </Container>
  );
}

export default Home;

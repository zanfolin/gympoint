import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { FlatList } from 'react-native-gesture-handler';
import api from '~/services/api';

import Button from '~/components/Button';

import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  Container,
  CheckinContainer,
  CheckinContainerTitle,
  CheckinContainerDate,
} from './styles';

export default function Dashboard() {
  const student_id = useSelector(state => state.user.profile.id);
  const [position, setPosition] = useState(1);
  const [page, setPage] = useState(1);
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(-1);
  const [count, SetCount] = useState(0);

  async function loadCheckins(xPage = 1, xCheckins = []) {
    try {
      page <= totalPage
        ? console.tron.log({ error: 'Deve realizar a leitura' })
        : console.tron.log({ error: 'Não deve realizar a leitura' });

      // if (page <= totalPage) {
      setLoading(true);

      // console.tron.log({ page });

      const { data } = await api.get(`/students/${student_id}/checkins`, {
        params: {
          page: xPage,
        },
      });
      // const { data } = await api.get(`/students/${student_id}/checkins`);
      setTotalPage(Math.ceil(data.count / 6));
      SetCount(data.count);

      // console.tron.log({ page });
      // console.tron.log(data);

      const newCheckins = data.rows.map(checkin => ({
        id: checkin.id,
        // title: `Check-in #${checkin.id}`,
        title: `Check-in #`,
        created_at: checkin.created_at,
        formatedDate: formatRelative(parseISO(checkin.created_at), new Date(), {
          locale: pt,
        }),
      }));

      setCheckins([...xCheckins, ...newCheckins]);
      // console.tron.log(newCheckins);
      // setCheckins(newCheckins);

      // console.tron.log({ totalPage, page });
      /* if (page < totalPage) {
            setPage(page + 1);
          } */
      setPage(xPage);
      // }
    } catch (error) {
      if (error.response.data.error) {
        Alert.alert('Gympoint', error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    // console.tron.log({ message: 'entrou no setLoading' });
    loadCheckins(1, []);
    // console.tron.log(checkins);
  }, []); // eslint-disable-line

  async function handleRequestCheckin() {
    try {
      await api.post(`/students/${student_id}/checkins`);
      Alert.alert('Sucesso', 'Check-in Realizado!');
      setLoading(true);
      // console.tron.log({ message: 'entrou no handle checjing' });
      loadCheckins(1, []);
    } catch (error) {
      if (error) {
        Alert.alert('Error', error.response.data.error);
      }
    }
  }

  async function handleCheckin() {
    Alert.alert(
      'Gympoint',
      'Deseja realizar um ckeck-in na academia?',
      [{ text: 'NÃO' }, { text: 'SIM', onPress: () => handleRequestCheckin() }],
      { cancelable: true }
    );
  }

  function handleLoadMore() {
    if (page <= totalPage) loadCheckins(page + 1, checkins);
  }
  return (
    <>
      <Header />
      <Container>
        <Button onPress={handleCheckin}>Novo check-in </Button>
        {loading ? (
          <ActivityIndicator color="#ccc" size={24} />
        ) : (
          <FlatList
            data={checkins}
            extraData={checkins}
            renderItem={({ item, index }) => (
              <CheckinContainer>
                <CheckinContainerTitle>
                  {`${item.title}${count - index}`}
                </CheckinContainerTitle>
                <CheckinContainerDate>{item.formatedDate}</CheckinContainerDate>
              </CheckinContainer>
            )}
            keyExtractor={item => item.id}
            onEndReachedThreshold={0.1}
            onEndReached={handleLoadMore}
          />
        )}
      </Container>
    </>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};

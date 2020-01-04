import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { FlatList } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import api from '~/services/api';

import Button from '~/components/Button';

import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  Container,
  HelpOrderContainer,
  HelpOrderHeader,
  HelpOrderHeaderResponse,
  HelpOrderIcon,
  HelpOrderTitle,
  HelpOrderDate,
  HelpOrderMessage,
} from './styles';

export default function HelpOrders({ navigation }) {
  const student_id = useSelector(state => state.user.profile.id);
  const [position, setPosition] = useState(1);
  const [page, setPage] = useState(1);
  const [helporders, setHelpOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(-1);
  const [count, SetCount] = useState(0);

  const refresh = navigation.getParam('refresh');

  async function loadHelpOrders(xPage = 1, xHelpOrders = []) {
    try {
      page <= totalPage
        ? console.tron.log({ error: 'HO - Deve realizar a leitura' })
        : console.tron.log({ error: 'HO - Não deve realizar a leitura' });

      // if (page <= totalPage) {
      setLoading(true);

      // console.tron.log({ page });

      const { data } = await api.get(`/help_orders/${student_id}/list`, {
        params: {
          page: xPage,
        },
      });

      if (data) {
        // Alert.alert('Gympoint', 'Tem dados');
        // const { data } = await api.get(`/students/${student_id}/checkins`);
        setTotalPage(Math.ceil(data.count / 2));
        SetCount(data.count);

        // console.tron.log({ page });
        // console.tron.log(data);

        // console.tron.log({ count });
        try {
          const newHelpOrders = data.rows.map(helporder => ({
            id: helporder.id,
            student_id: helporder.student_id,
            question: helporder.question,
            answer: helporder.answer,
            answer_at: helporder.answer_at,
            created_at: helporder.created_at,
            formatedCreated_at: helporder.created_at
              ? formatRelative(parseISO(helporder.created_at), new Date(), {
                  locale: pt,
                })
              : '',
            formatedAnswer_at: helporders.answer_at
              ? formatRelative(parseISO(helporders.answer_at), new Date(), {
                  locale: pt,
                })
              : '',
          }));

          // console.tron.log(newHelpOrders);

          setHelpOrders([...xHelpOrders, ...newHelpOrders]);
          // console.tron.log(newCheckins);
          // setCheckins(newCheckins);

          // console.tron.log({ totalPage, page });
          /* if (page < totalPage) {
            setPage(page + 1);
          } */
          setPage(xPage);
        } catch (e) {
          Alert.alert('Gympoint', e.message);
        }

        // }
      }
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
    loadHelpOrders(1, []);
    // console.tron.log(checkins);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (refresh) {
      setLoading(true);
      loadHelpOrders(1, []);
    }
  }, [refresh]); // eslint-disable-line

  function handleNewQuestion() {
    navigation.navigate('Question');
  }

  async function handleDetails(help) {
    navigation.navigate('Answer', { help });
  }

  function handleLoadMore() {
    if (page <= totalPage) loadHelpOrders(page + 1, helporders);
  }
  return (
    <>
      <Header />
      <Container>
        <Button onPress={handleNewQuestion}>Novo Pedido de Ajuda</Button>
        {loading ? (
          <ActivityIndicator color="#ccc" size={24} />
        ) : (
          <FlatList
            data={helporders}
            extraData={helporders}
            renderItem={({ item }) => (
              <HelpOrderContainer
                onPress={() => handleDetails(item)}
                enabled={!!item.answer}
              >
                <HelpOrderHeader>
                  <HelpOrderHeaderResponse>
                    <HelpOrderIcon
                      name="check-circle"
                      size={20}
                      answered={!!item.answer_at}
                    />
                    <HelpOrderTitle>
                      {item.answer_at ? 'Respondido' : 'Sem resposta'}
                    </HelpOrderTitle>
                  </HelpOrderHeaderResponse>

                  <HelpOrderDate>{item.formatedCreated_at}</HelpOrderDate>
                </HelpOrderHeader>
                <HelpOrderMessage>{item.question}</HelpOrderMessage>
              </HelpOrderContainer>
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

HelpOrders.navigationOptions = {
  tabBarLabel: 'Pedido de Ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};

HelpOrders.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

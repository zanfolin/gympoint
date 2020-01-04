import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  padding: 15px 10px;
`;

export const HelpOrderContainer = styled(RectButton)`
  display: flex;
  justify-content: space-between;

  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  padding: 10px;
  margin-top: 20px;
`;

export const HelpOrderHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15;
  height: 45;
`;

export const HelpOrderHeaderResponse = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HelpOrderIcon = styled(Icon)`
  color: ${props => (props.answered ? '#42cb59' : '#999999')};
  padding-right: 5px;
`;

export const HelpOrderTitle = styled.Text`
  font-family: Roboto-Bold sans-serif;
  font-size: 14px;
  color: #444444;
  font-weight: bold;
  align-items: center;
`;

export const HelpOrderDate = styled.Text`
  font-family: Roboto-Regular sans-serif;
  font-size: 14px;
  color: #666666;
`;

export const HelpOrderMessage = styled.Text`
  font-family: Roboto-Regular sans-serif;
  font-size: 14px;
  color: #666666;
`;

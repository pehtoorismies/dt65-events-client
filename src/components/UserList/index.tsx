import React, { FunctionComponent, Fragment } from 'react';
import { Flex, Text, Box } from 'rebass';
import { IBaseUserInfo } from '../../types';
import map from 'ramda/es/map';
import addIndex from 'ramda/es/addIndex';
interface IProps {
  users: IBaseUserInfo[];
}


const mapIndexed = addIndex(map);

const renderUser = (u: any, idx: number) => {
  const odd = idx % 2 === 1;
  return (
    <Flex key={u.id} bg={odd ? 'white' : '#fbe5f7'} py={3} px={2} color="standardBlack" sx={{borderBottom: '1px solid #eee'}}>
      <Text fontFamily="monospace" width={150}>{u.nickname} </Text>
      <Text>{u.name}</Text>
    </Flex>
  );
};

const UserList: FunctionComponent<IProps> = (props: IProps) => {
  const { users } = props;

  return (
    <Box width="100%" p={3}>
      <Flex width="100%" mt={2}  px={2} bg="blue" color="white" py={3} >
        <Text width={150}>käyttäjätunnus</Text>
        <Text>nimi</Text>
      </Flex>
      <Flex width="100%" flexDirection="column"  >
        {mapIndexed(renderUser, users)}
      </Flex>
    </Box>
  );
};

export default UserList;

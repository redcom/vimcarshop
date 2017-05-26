// @flow
import type { CartItemType, ShopItemType } from '../store/CommonStoreTypes';

import React from 'react';
import { Button, Price, PriceRegular, PriceDiscounted } from '../components';
import styled from 'styled-components';
import {
  boxShadow,
  defaultBorderColor,
  defaultPrimaryBgColor,
  defaultSpaceBetweenElements,
  smallFontSize,
} from '../styles/vars';

const CartItems = styled.div`
  position: absolute;
  top: 2.5em;
  right: -1em;
  width: 250px;
  box-shadow: ${boxShadow};
  font-size: ${smallFontSize}
`;

const ArrowUp = styled.div`
  position: relative;
  left: 84%;
  top: -15px;
  width: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 20px solid ${defaultPrimaryBgColor};
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  background: ${defaultPrimaryBgColor};
`;

const ListItem = styled.li`
  margin: ${defaultSpaceBetweenElements};
  padding: 1em 0;
  display: flex;
  border-bottom: 1px solid ${defaultBorderColor};
  &:first-of-type { margin-top: -1em; }
  &:last-of-type { border-bottom: none; }
`;

const Left = styled.div`
  flex: 1;
  &>img { width: 70%; }
`;

const Right = styled.div`
  flex: 3;
`;

const Description = styled.div`
  min-height: 3.7em;
  overflow: hidden;
`;

const ExtraInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const renderCartItem = onRemove =>
  item => (
    <ListItem key={`item-${item.id}`}>
      <Left>
        <img src={`../assets/items/${item.image}`} alt="" />
        {item.discount && item.discount > 0
          ? <PriceRegular marginTop="0.4em" marginBottom="0">
              {item.price}
            </PriceRegular>
          : <Price marginTop="0.4em"> {item.price} </Price>}
      </Left>
      <Right>
        <Description>{item.description}</Description>
        <ExtraInfo>
          {item.discount &&
            item.discount > 0 &&
            <PriceDiscounted marginTop="0.4em" marginBottom="0">
              {' '}{item.discount}{' '}
            </PriceDiscounted>}
          <Button
            fontSize={smallFontSize}
            width="auto"
            onClick={onRemove(item.id)}
          >
            Remove
          </Button>
        </ExtraInfo>
      </Right>
    </ListItem>
  );

type FullCartItemInfo = CartItemType & ShopItemType;
type CartListType = {
  cartList: Array<FullCartItemInfo>,
  onRemove: Function,
};

const CartList = (
  {
    cartList = [],
    onRemove,
  }: CartListType,
) => (
  <CartItems>
    <ArrowUp />
    <List>
      {cartList.map(renderCartItem(onRemove))}
    </List>
  </CartItems>
);

export default CartList;

import { colors, dimensions } from 'modules/common/styles';
import { BarItems } from 'modules/layout/styles';
import styled from 'styled-components';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px 6px;
  background: ${colors.colorWhite};
  min-height: 50px;
`;

const ButtonGroup = styled.div`
  display: inline-block;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid ${colors.borderPrimary};

  a {
    padding: 7px 16px;
    display: inline-block;
    color: ${colors.colorCoreGray};
    font-weight: 500;
    border-radius: 2px;

    i {
      margin-right: 5px;
    }

    &.active {
      color: ${colors.colorCoreDarkGray};
      background: ${colors.colorWhite};

      i {
        color: ${colors.colorSecondary};
      }
    }

    &:last-of-type {
      border: none;
    }

    &:hover {
      color: ${colors.colorCoreDarkGray};
    }
  }
`;

const HeaderItems = styled(BarItems)`
  > * + * {
    margin-left: ${dimensions.coreSpacing}px;
  }
`;

const HeaderButton = styled.div`
  padding: 0 10px;
  line-height: 32px;
  height: 34px;
  border-radius: 3px;
  transition: background 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  display: inline-block;
  vertical-align: middle;

  > i {
    font-size: 8px;
    color: ${colors.colorCoreGray};
    margin-left: 8px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.06);
    cursor: pointer;
  }

  a span {
    margin: 0;
  }
`;

const HeaderLabel = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  margin-right: -18px;
  font-weight: 500;
  color: ${colors.colorCoreGray};
`;

const HeaderLink = styled(HeaderButton)`
  padding: 0;
  margin-left: 10px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.04);

  a {
    color: ${colors.colorCoreGray};
    padding: 0 12px;
    display: block;
    line-height: 34px;
  }
`;

export {
  ButtonGroup,
  PageHeader,
  HeaderButton,
  HeaderLabel,
  HeaderItems,
  HeaderLink
};

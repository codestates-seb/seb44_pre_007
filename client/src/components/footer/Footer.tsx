import tw from 'tailwind-styled-components';
import FooterLogo from './FooterLogo';
import Copyright from './Copyright';
import ListItem from './ListItem';

const StyledFooter = tw.footer`
  flex justify-center items-center w-full h-[322px] border-b bg-blackDark
`;

const FooterContainer = tw.div`
  flex flex-row max-w-[1240px] px-3 pb-3 pt-8 border-b
`;

const FooterNav = tw.nav`
  flex flex-row w-3/4 text-xs
`;

function Footer() {
  const stackOverFlow = {
    header: 'STACK OVERFLOW',
    item: ['Questions', 'Help'],
  };

  const products = {
    header: 'PRODUCTS',
    item: ['Teams', 'Advertising', 'Collectives', 'Talent'],
  };

  const company = {
    header: 'COMPANY',
    item: ['About', 'Press', 'Work Here', 'Legal', 'Privacy Policy', 'Terms of Service', 'Contact Us', 'Cookie Settings', 'Cookie Policy'],
  };

  const stackExchangeNetwork = {
    header: 'STACK EXCHANGE NETWORK',
    item: ['Technology', 'Culture & recreation', 'Life & arts', 'Science', 'Professional', 'Business', ' ', 'API', 'Data'],
  };

  return (
    <StyledFooter>
      <FooterContainer>
        <FooterLogo />
        <FooterNav>
          <ListItem header={stackOverFlow.header} item={stackOverFlow.item} />
          <ListItem header={products.header} item={products.item} />
          <ListItem header={company.header} item={company.item} />
          <ListItem header={stackExchangeNetwork.header} item={stackExchangeNetwork.item} />
        </FooterNav>
        <Copyright />
      </FooterContainer>
    </StyledFooter>
  );
}

export default Footer;

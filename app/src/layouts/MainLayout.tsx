import { Portal, Text, Box, useDisclosure } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin';
import Sidebar from 'components/sidebar/Sidebar';
import { SidebarContext } from 'contexts/SidebarContext';
import { useState } from 'react';

export default function MainLayout(props: any) {
    const { ...rest } = props;
    const [ fixed ] = useState(false);
	const [ toggleSidebar, setToggleSidebar ] = useState(false);
    const { onOpen } = useDisclosure();

    return (
        <>
            <Box>
			<SidebarContext.Provider
				value={{
					toggleSidebar,
					setToggleSidebar
				}}>
				<Sidebar  display='none' {...rest} />
				<Box
					float='right'
					minHeight='100vh'
					height='100%'
					overflow='auto'
					position='relative'
					maxHeight='100%'
					w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
					maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
					transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
					transitionDuration='.2s, .2s, .35s'
					transitionProperty='top, bottom, width'
					transitionTimingFunction='linear, linear, ease'>
					<Portal>
						<Box>
							<Navbar  />
						</Box>
					</Portal>
                    <Box mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='50px'>

{props.children}
</Box>
					<Box>

						<Footer />
					</Box>
				</Box>
			</SidebarContext.Provider>
		</Box>
        </>


    )
  }
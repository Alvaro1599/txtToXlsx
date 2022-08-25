import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Flex, Tab } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import Aside from './components/Aside'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Flex className="App" minW={"320px"} mx={"auto"} maxWidth={"1600px"} as={"div"} w={"100vw"} h={"100vh"} flexDir={"column"}>
      <Navbar/>
      <Aside/>
    </Flex>
  )
}

export default App

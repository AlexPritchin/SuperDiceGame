import Dice0 from '../assets/images/Dice0.svg';
import Dice1 from '../assets/images/Dice1.svg';
import Dice2 from '../assets/images/Dice2.svg';
import Dice3 from '../assets/images/Dice3.svg';
import Dice4 from '../assets/images/Dice4.svg';
import Dice5 from '../assets/images/Dice5.svg';
import Dice6 from '../assets/images/Dice6.svg';

const DiceImage = ({ imageNumber }) => {
  const DiceSVGsArray = [
    <Dice0 height={160} width={160} />,
    <Dice1 height={160} width={160} />,
    <Dice2 height={160} width={160} />,
    <Dice3 height={160} width={160} />,
    <Dice4 height={160} width={160} />,
    <Dice5 height={160} width={160} />,
    <Dice6 height={160} width={160} />,
  ];
  return DiceSVGsArray[imageNumber];
};

export default DiceImage;

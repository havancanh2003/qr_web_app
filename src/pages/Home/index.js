
import './home.scss';
import icon from '../../assets/image/icon.png'
import logo192 from '../../assets/image/logo192.png'
function Home() {
  return (
    <div className='homePage'>
      <div className='topBar'>
        <img src={logo192} alt='LOGO'></img>
      </div>
      <div className='adsBanner'></div>
      <p className='yourTable'>Bạn đang ngồi bàn:</p>
      <hr />
      <button className='homeButton'>
        <img src={icon} alt='icon'></img>
        <span>Gọi Nhân Viên</span>
      </button>
      <button className='homeButton' id='secondButton'>Xem Menu - Gọi Món</button>
      <p id='introduce'>Powed by 4Flex</p>
    </div>
  );
}

export default Home;


import './home.scss';


function Home() {
  return (
    <div className='homePage'>
      <div className='topBar'>
        <img src='' alt='LOGO'></img>
      </div>
      <div className='adsBanner'></div>
      <p className='yourTable'>Bạn đang ngồi bàn:</p>
      <hr />
      <button className='homeButton'>
        <img src='' alt='icon'></img>
        Gọi Nhân Viên
        </button>
      <button className='homeButton' id='secondButton'>Xem Menu - Gọi Món</button>
      <p>Powed by 4Flex</p>
    </div>
  );
}

export default Home;

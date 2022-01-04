import PageInfo from '../components/PageInfo/PageInfo';
import IncredibleOffer from '../components/IncredibleOffer/IncredibleOffer';
import Collection from '../components/Collection/Collection';
import Footer from '../components/Footer/Footer';

const Home = () => {

  return (
    <>
      <PageInfo
        message1={`WELCOME TO iSHOP`}
        message2={`🔥 Hot Deals for you 👇`}
      />

      <IncredibleOffer
        collectionName="Incredible Offer"
        onCollectionPreview={true}
      />

      <Collection
        pageLink="/collection/bag"
        collectionName="Bag"
        onCollectionPreview={true}
      />

      <Collection
        pageLink="/collection/shirt"
        collectionName="Shirt"
        onCollectionPreview={true}
      />

      <Collection
        pageLink="/collection/device"
        collectionName="Device"
        onCollectionPreview={true}
      />

      <Collection
        pageLink="/collection/wrist-watch"
        collectionName="Wrist Watch"
        onCollectionPreview={true}
      />

      <Collection
        pageLink="/collection/shoe"
        collectionName="Shoe"
        onCollectionPreview={true}
      />

      <Footer />
    </>
  )
}

export default Home;

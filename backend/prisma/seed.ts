//@ts-ignore
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {

//   await prisma.item.deleteMany({});

  await prisma.item.createMany({
    data: [
      {
         "discountPercent":12,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1569546236/ishopSite/jwdt43ghpn3ubqiwjldo.png",
         "description":"A nice coat for everyone",
         "amount":15000,
         "category":"SHIRT",
         "itemName":"coat",
         "image2":null,
         "newPrice":13500
      },
      {
         "discountPercent":20,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1569546408/ishopSite/ubycnyamqsn7d6mrhvem.png",
         "description":"A well-designed shirt for women.",
         "amount":18000,
         "category":"SHIRT",
         "itemName":"women top",
         "image2":null,
         "newPrice":14400
      },
      {
         "discountPercent":5,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1569546683/ishopSite/qdadvrzzvuf3xaudktvi.jpg",
         "description":"Nice canvas for men",
         "amount":50000,
         "category":"SHOE",
         "itemName":"blue canvas",
         "image2":"https://res.cloudinary.com/chybesta123/image/upload/v1569546710/ishopSite/msdyugjduxauhilihxst.jpg",
         "newPrice":47500
      },
      {
         "discountPercent":18,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1569546781/ishopSite/tolw6knomcowofdfzkco.jpg",
         "description":"A well-designed bag. Nice to have.",
         "amount":18000,
         "category":"BAG",
         "itemName":"baggy",
         "image2":null,
         "newPrice":14760
      },
      {
         "discountPercent":20,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1569546915/ishopSite/z8ae3knjluocjgj636uq.jpg",
         "description":"A nice bag for travellers",
         "amount":45000,
         "category":"BAG",
         "itemName":"traveller",
         "image2":null,
         "newPrice":36000
      },
      {
         "discountPercent":15,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1569547001/ishopSite/sc0gpeskrb8uhu13fr9w.jpg",
         "description":"A nice wrist watch for all",
         "amount":25000,
         "category":"WRISTWATCH",
         "itemName":"x-rolex",
         "image2":null,
         "newPrice":21250
      },
      {
         "discountPercent":20,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1569547754/ishopSite/hyg6sa25aysutdgya2g0.png",
         "description":"Nice Black Wrist Watch to have.",
         "amount":15000,
         "category":"WRISTWATCH",
         "itemName":"black wrist",
         "image2":null,
         "newPrice":12000
      },
      {
         "discountPercent":5,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1569548062/ishopSite/fu6mxvot5zakdnwcdefp.png",
         "description":"Nice brown shoe to have.",
         "amount":15000,
         "category":"SHOE",
         "itemName":"brown canvas",
         "image2":null,
         "newPrice":14250
      },
      {
         "discountPercent":10,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1569548176/ishopSite/ybtbscii6mbikjsvo9bg.jpg",
         "description":"Need More is well designed",
         "amount":85000,
         "category":"SHIRT",
         "itemName":"need more",
         "image2":null,
         "newPrice":76500
      },
      {
         "discountPercent":12,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1569548342/ishopSite/ruzc6aibprzyuh8kwxg6.jpg",
         "description":"well-designed Nike Canvas for everyone",
         "amount":25000,
         "category":"SHOE",
         "itemName":"nike",
         "image2":null,
         "newPrice":22000
      },
      {
         "discountPercent":23,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1569548852/ishopSite/kuaphnphpm7gvft0gipt.jpg",
         "description":"Nice Coat for men",
         "amount":45000,
         "category":"SHIRT",
         "itemName":"m coat",
         "image2":null,
         "newPrice":34650
      },
      {
         "discountPercent":50,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1569549015/ishopSite/acjnnrhuximerdk1c0by.png",
         "description":"Hand bag for women",
         "amount":60000,
         "category":"BAG",
         "itemName":"wx-bag",
         "image2":null,
         "newPrice":30000
      },
      {
         "discountPercent":5,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1569549187/ishopSite/cau9lpmxfb25ophqpf9c.jpg",
         "description":"A well-designed bag. Nice to have.",
         "amount":35000,
         "category":"BAG",
         "itemName":"z-bag",
         "image2":null,
         "newPrice":33250
      },
      {
         "discountPercent":8,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1569549567/ishopSite/mpluxs3ixy75mpxkcvlr.png",
         "description":"Nice wrist watch to have",
         "amount":35000,
         "category":"WRISTWATCH",
         "itemName":"b-rolex",
         "image2":null,
         "newPrice":32200
      },
      {
         "discountPercent":10,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1569549792/ishopSite/y71yo9600kbf6eexcfmn.jpg",
         "description":"A well-designed bag. Nice to have.",
         "amount":18800,
         "category":"BAG",
         "itemName":"school bag",
         "image2":null,
         "newPrice":16920
      },
      {
         "discountPercent":12,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1569549919/ishopSite/ir2eejslrgw7kezg3ivv.jpg",
         "description":"CRW Canvas is well-designed and nice to have.",
         "amount":15000,
         "category":"SHOE",
         "itemName":"crw canvas",
         "image2":null,
         "newPrice":13200
      },
      {
         "discountPercent":10,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1569550092/ishopSite/jzujoqpoonu7io4ogyty.jpg",
         "description":"Nice Long Sleeve",
         "amount":6000,
         "category":"SHIRT",
         "itemName":"long sleeve",
         "image2":null,
         "newPrice":5400
      },
      {
         "discountPercent":5,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1569550428/ishopSite/pm4fsxambdz9fw1cqhdv.png",
         "description":"A nice wrist to have",
         "amount":24000,
         "category":"WRISTWATCH",
         "itemName":"flexi wrist",
         "image2":null,
         "newPrice":22800
      },
      {
         "discountPercent":5,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1575936239/ishopSite/nbva2rez2yczawsxw2pl.png",
         "description":"Nice Phone for all",
         "amount":54000,
         "category":"DEVICE",
         "itemName":"iPhone",
         "image2":null,
         "newPrice":51300
      },
      {
         "discountPercent":20,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1575937414/ishopSite/ml9cwdlfz92i5ufmqrme.jpg",
         "description":"Latest iPhone in the market",
         "amount":150000,
         "category":"DEVICE",
         "itemName":"iPhone 12",
         "image2":null,
         "newPrice":120000
      },
      {
         "discountPercent":8,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1575937584/ishopSite/tuyk98rhlnuc6xtk8ckm.jpg",
         "description":"A well-designed phone. Nice to have.",
         "amount":75000,
         "category":"DEVICE",
         "itemName":"infocus",
         "image2":null,
         "newPrice":69000
      },
      {
         "discountPercent":8,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1575937782/ishopSite/yqlayjtjy9tyy80ofibf.jpg",
         "description":"A well-designed mobile phone. Nice to have.",
         "amount":35000,
         "category":"DEVICE",
         "itemName":"lg",
         "image2":null,
         "newPrice":32200
      },
      {
         "discountPercent":10,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1575938064/ishopSite/mdanvoxqxsvm6cgnoeq8.jpg",
         "description":"Samsung Galaxy A50, a nice phone for everyone",
         "amount":35000,
         "category":"DEVICE",
         "itemName":"galaxy a50",
         "image2":null,
         "newPrice":31500
      },
      {
         "discountPercent":5,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1575938259/ishopSite/uuztteurj47oz1xjjnxb.jpg",
         "description":"A well-designed mobile phone. Nice to have.",
         "amount":50000,
         "category":"DEVICE",
         "itemName":"umidigi",
         "image2":null,
         "newPrice":47500
      },
      {
         "discountPercent":5,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1575941044/ishopSite/uz0qjpempb777up077pp.jpg",
         "description":"Apple IPhone X 5.8-Inches, nice device to have.",
         "amount":50000,
         "category":"DEVICE",
         "itemName":"iphone x",
         "image2":null,
         "newPrice":47500
      },
      {
         "discountPercent":10,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1575941606/ishopSite/lq9torrtwsu0nhmdbu1q.jpg",
         "description":"Nokia 2.1 5.5-inch HD Display 8GB, 1GB RAM (8MP + 5MP) Dual Sim 4000mAh, nice device to have.",
         "amount":350000,
         "category":"DEVICE",
         "itemName":"nokia",
         "image2":null,
         "newPrice":315000
      },
      {
         "discountPercent":10,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1575947090/ishopSite/iiyfxxnb0qr9vmsf7vow.jpg",
         "description":"Yazole Women's Leather Strap Watch - Black\n\n",
         "amount":18500,
         "category":"WRISTWATCH",
         "itemName":"strap watch",
         "image2":null,
         "newPrice":16650
      },
      {
         "discountPercent":10,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1575947434/ishopSite/kb55ctbnys0hs5rdmnbc.jpg",
         "description":"Unisex Digital LED Sports Watch Band Wrist Watch",
         "amount":18000,
         "category":"WRISTWATCH",
         "itemName":"unisex wrist",
         "image2":null,
         "newPrice":16200
      },
      {
         "discountPercent":8,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1575948421/ishopSite/py6lgldwghpvdvgdu4fp.png",
         "description":"A well-designed bag. Nice to have.",
         "amount":65000,
         "category":"BAG",
         "itemName":"hand bag",
         "image2":null,
         "newPrice":59800
      },
      {
         "discountPercent":10,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1575949172/ishopSite/xweu7e9qvyfwkil3invh.jpg",
         "description":"Programmers T-shirt. Nice to have.",
         "amount":55000,
         "category":"SHIRT",
         "itemName":"e s c r",
         "image2":null,
         "newPrice":49500
      },
      {
         "discountPercent":10,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1575949468/ishopSite/ksd1mrkpflyxduyzkb7l.jpg",
         "description":"Javascript Developer T-shirt. Nice to have.",
         "amount":50000,
         "category":"SHIRT",
         "itemName":"js t-shirt",
         "image2":null,
         "newPrice":45000
      },
      {
         "discountPercent":15,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1576251350/ishopSite/dqerrc6jw54h9axhwljg.jpg",
         "description":"Pure leather wrist watch. Nice to have.",
         "amount":45000,
         "category":"WRISTWATCH",
         "itemName":"leather wrist",
         "image2":null,
         "newPrice":38250
      },
      {
         "discountPercent":12,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1576251810/ishopSite/z0ada3510kuccmwdxwjl.jpg",
         "description":"A nice wrist watch for everyone",
         "amount":35000,
         "category":"WRISTWATCH",
         "itemName":"golden wrist",
         "image2":null,
         "newPrice":30800
      },
      {
         "discountPercent":5,
         "image1":"https://res.cloudinary.com/chybesta123/image/upload/v1582801693/ishopSite/qswooztcpo2ceib9fjqt.jpg",
         "description":"A nice bag for everyone, well designed and made with leather.",
         "amount":75000,
         "category":"BAG",
         "itemName":"Gee Bag",
         "image2":null,
         "newPrice":71250
      }
    ]
  })
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect();
  })

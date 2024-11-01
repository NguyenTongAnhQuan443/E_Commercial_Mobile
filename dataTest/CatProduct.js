const catProducts = [
    {
        id: 1,
        name: "Whiskas® Adult Vị Hải Sản 1.2kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$15.99"
    },
    {
        id: 2,
        name: "Whiskas® Adult Vị Hải Sản 1.5kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$18.99"
    },
    {
        id: 3,
        name: "Whiskas® Adult Vị Hải Sản 2kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$20.99"
    },
    {
        id: 4,
        name: "Whiskas® Adult Vị Hải Sản 2.5kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$23.99"
    },
    {
        id: 5,
        name: "Whiskas® Adult Vị Hải Sản 3kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$26.99"
    },
    {
        id: 6,
        name: "Whiskas® Adult Vị Hải Sản 3.5kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$29.99"
    },
    {
        id: 7,
        name: "Whiskas® Adult Vị Hải Sản 4kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$32.99"
    },
    {
        id: 8,
        name: "Whiskas® Adult Vị Hải Sản 4.5kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$35.99"
    },
    {
        id: 9,
        name: "Whiskas® Adult Vị Hải Sản 5kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$38.99"
    },
    {
        id: 10,
        name: "Whiskas® Adult Vị Hải Sản 5.5kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$41.99"
    },
    {
        id: 11,
        name: "Whiskas® Adult Vị Hải Sản 6kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$44.99"
    },
    {
        id: 12,
        name: "Whiskas® Adult Vị Hải Sản 6.5kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$47.99"
    },
    {
        id: 13,
        name: "Whiskas® Adult Vị Hải Sản 7kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$50.99"
    },
    {
        id: 14,
        name: "Whiskas® Adult Vị Hải Sản 7.5kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$53.99"
    },
    {
        id: 15,
        name: "Whiskas® Adult Vị Hải Sản 8kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$56.99"
    },
    {
        id: 16,
        name: "Whiskas® Adult Vị Hải Sản 8.5kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$59.99"
    },
    {
        id: 17,
        name: "Whiskas® Adult Vị Hải Sản 9kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$62.99"
    },
    {
        id: 18,
        name: "Whiskas® Adult Vị Hải Sản 9.5kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$65.99"
    },
    {
        id: 19,
        name: "Whiskas® Adult Vị Hải Sản 10kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$68.99"
    },
    {
        id: 20,
        name: "Whiskas® Adult Vị Hải Sản 10.5kg",
        image: "https://cdn.onemars.net/sites/whiskas_vn_282Hk_mwh5/image/whiskas-3d-1-2kg-fop-adult-gourmetseafood-2_1713963135964_1718712797959.png",
        price: "$71.99"
    }
];

export default catProducts;

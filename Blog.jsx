import React, { useState, useEffect } from "react";

export default function Blog() {
  const [product, setProduct] = useState({
    title: "",
    image: "",
    blog: "",
  });

  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(data);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !product.title.trim() ||
      !product.image.trim() ||
      !product.blog.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    let updatedProducts;

    if (editIndex !== null) {
      updatedProducts = [...products];
      updatedProducts[editIndex] = product;
      setEditIndex(null);
    } else {
      updatedProducts = [...products, product];
    }

    setProducts(updatedProducts);
    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    setProduct({
      title: "",
      image: "",
      blog: "",
    });
  }

  function Delete(index) {
    const updated = products.filter((_, i) => i !== index);

    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  }

  function Edit(index) {
    setProduct(products[index]);
    setEditIndex(index);
  }

  const filteredProducts = [...products]
    .filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "az") {
        return a.title.localeCompare(b.title);
      }

      if (sort === "za") {
        return b.title.localeCompare(a.title);
      }

      return 0;
    });

  const styles = {
    container: {
    minHeight: "100vh",
    background: "white",
    padding: "40px",
    fontFamily: "Segoe UI, sans-serif",
  },

  formCard: {
    background: "#d4cdcd",
    maxWidth: "850px",
    margin: "0 auto 30px",
    padding: "30px",
    borderRadius: "20px",
    border:"1px solid",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },

  heading: {
    textAlign: "center",
    fontSize: "40px",
    fontWeight: "bold",
    color: "#151315c4",
    marginBottom: "25px",
  },

  input: {
    width: "60%",
    padding: "14px",
    marginBottom: "15px",
    border: "1px solid #2c4f93",
    borderRadius: "10px",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  textarea: {
    width: "60%",
    padding: "14px",
    marginBottom: "15px",
    border: "1px solid #263e6e",
    borderRadius: "10px",
    resize: "none",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  button: {
    width: "45%",
    padding: "14px",
    background: "pink",
    color: "#1e1c1e",
    border: "1px solid",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  topBar: {
    display: "flex",
    gap: "15px",
    marginBottom: "35px",
  },

  search: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid",
    fontSize: "15px",
  },

  select: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid",
    fontSize: "15px",
  },

  grid: {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: "5px",
},

  card: {
  background: "#fff",
  borderRadius: "5px",
  overflow: "hidden",
  boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
  maxWidth: "280px",
  margin: "auto",
},

  image: {
  width: "100%",
  height: "160px",
  objectFit: "cover",
},

  title: {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#4f46e5",
  padding: "10px 12px 5px",
},

  blog: {
  color: "#555",
  lineHeight: "1.5",
  padding: "0 12px",
  fontSize: "14px",
},
  btnGroup: {
    display: "flex",
    gap: "10px",
    padding: "15px",
  },

  editBtn: {
    flex: 1,
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  deleteBtn: {
    flex: 1,
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  noData: {
    textAlign: "center",
    color: "#fff",
    fontSize: "28px",
    fontWeight: "bold",
    marginTop: "30px",
  },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
       <h1 style={styles.heading}> Blog Box </h1>

        <form onSubmit={handleSubmit}>

          <input type="text"name="title"placeholder="Enter Blog Title"value={product.title} onChange={handleChange} style={styles.input} />
          <input type="text" name="image" placeholder="Enter Image URL" value={product.image} onChange={handleChange} style={styles.input} />
          <textarea name="blog" rows="4" placeholder="Enter Blog Content" value={product.blog} onChange={handleChange}style={styles.textarea}/>
          <button type="submit" style={styles.button}>
            {editIndex !== null ? "Update Blog" : "Add Blog"}
          </button>

        </form>
      </div>

      <div style={styles.topBar}>
        <input type="text" placeholder="Search..."  value={search}onChange={(e) => setSearch(e.target.value)}style={styles.search} />
        <select value={sort}  onChange={(e) => setSort(e.target.value)} style={styles.select}>
          <option value="">Sort</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>

      <div style={styles.grid}>
        {filteredProducts.map((item, index) => (
          <div key={index} style={styles.card}>
            <img src={item.image} alt={item.title} style={styles.image}/>

            <h3 style={styles.title}>{item.title}</h3>

            <p style={styles.blog}>{item.blog}</p>

            <div style={styles.btnGroup}>

              <button style={styles.editBtn}onClick={() => Edit(index)} >
                Edit
              </button>

              <button style={styles.deleteBtn} onClick={() => Delete(index)} >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <h2 style={styles.noData}>Not Found</h2>
      )}
    </div>
  );
}
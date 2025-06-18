class PostsManager {
  constructor(db) {
    this.db = db;
  }

  async getPosts() {
    const snapshot = await this.db.collection("posts").get();
    const author = await snapshot.docs[0].data().authorRef.get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      author: author.data(),
    }));
  }
}

module.exports = PostsManager;

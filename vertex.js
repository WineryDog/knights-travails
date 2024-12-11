class Vertex {
  constructor(address, neighbours, path = null) {
    this.address = address;
    this.neighbours = neighbours;
    this.path = path;
  }
}

export default Vertex;

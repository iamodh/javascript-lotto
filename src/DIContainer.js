class DIContainer {
  #services = new Map();

  register(serviceName, service) {
    this.#services.set(serviceName, service);
  }

  resolve(serviceName) {
    if (!this.hasService(serviceName)) {
      throw new Error(`[ERROR] ${serviceName}이 존재하지 않습니다.`);
    }

    const service = this.#services.get(serviceName);
    return new service();
  }

  hasService(serviceName) {
    return this.#services.has(serviceName);
  }
}

export default DIContainer;

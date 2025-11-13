class DIContainer {
  #services = new Map();

  register(serviceName, serviceDefinition, args = []) {
    this.#services.set(serviceName, { serviceDefinition, args });
  }

  resolve(serviceName) {
    const service = this.#services.get(serviceName);

    if (!service) {
      throw new Error(`[ERROR] ${serviceName}이 존재하지 않습니다.`);
    }

    const resolved = [];

    // 의존성은 반드시 register가 되어 있어야 함
    service.args.map((arg) => {
      if (this.#services.has(arg)) {
        // 의존성인 경우
        resolved.push(this.resolve(arg));
      } else {
        // 일반 값인 경우
        resolved.push(arg);
      }
    });

    return new service.serviceDefinition(...resolved);
  }

  hasService(serviceName) {
    return this.#services.has(serviceName);
  }
}

export default DIContainer;

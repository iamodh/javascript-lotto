class DIContainer {
  #services = new Map();

  register(serviceName, serviceDefinition, dependencyNames = []) {
    this.#services.set(serviceName, { serviceDefinition, dependencyNames });
  }

  resolve(serviceName) {
    const service = this.#services.get(serviceName);

    if (!service) {
      throw new Error(`[ERROR] ${serviceName}이 존재하지 않습니다.`);
    }

    const resolvedDependencies = service.dependencyNames.map((depName) =>
      this.resolve(depName)
    );

    return new service.serviceDefinition(...resolvedDependencies);
  }

  hasService(serviceName) {
    return this.#services.has(serviceName);
  }
}

export default DIContainer;

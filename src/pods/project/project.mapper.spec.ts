import { mapProjectFromApiToVm } from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

describe('./pods/project/project.mapper', () => {
  it('should return empty project when feeding null or undefined value', () => {
    // Arrange & Act & Assert - null
    const resultNull = mapProjectFromApiToVm(null);
    expect(resultNull).toEqual(viewModel.createEmptyProject());

    // Arrange & Act & Assert - undefined
    const resultUndefined = mapProjectFromApiToVm(undefined);
    expect(resultUndefined).toEqual(viewModel.createEmptyProject());
  });

  it('should return expected result when feeding null or undefined employees list', () => {
    // Arrange
    const baseProject = {
      id: 'test-id',
      name: 'test project',
      externalId: 'ext-123',
      comments: 'test comments',
      isActive: true,
    };

    const expectedResult: viewModel.Project = {
      ...baseProject,
      employees: [],
    };

    // Act & Assert - null employees
    const resultNull = mapProjectFromApiToVm({
      ...baseProject,
      employees: null,
    } as apiModel.Project);
    expect(resultNull).toEqual(expectedResult);

    // Act & Assert - undefined employees
    const resultUndefined = mapProjectFromApiToVm({
      ...baseProject,
      employees: undefined,
    } as apiModel.Project);
    expect(resultUndefined).toEqual(expectedResult);
  });

  it('should return expected result when feeding empty employees list', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test-id',
      name: 'test project',
      externalId: 'ext-123',
      comments: 'test comments',
      isActive: true,
      employees: [],
    };

    const expectedResult: viewModel.Project = {
      id: 'test-id',
      name: 'test project',
      externalId: 'ext-123',
      comments: 'test comments',
      isActive: true,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return expected result when feeding correct values with employees', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test-id',
      name: 'test project',
      externalId: 'ext-123',
      comments: 'test comments',
      isActive: true,
      employees: [
        {
          id: 'employee-1',
          employeeName: 'John Doe',
          isAssigned: true,
        },
        {
          id: 'employee-2',
          employeeName: 'Jane Smith',
          isAssigned: false,
        },
        {
          id: 'employee-3',
          employeeName: 'Bob Johnson',
        },
      ],
    };

    const expectedResult: viewModel.Project = {
      id: 'test-id',
      name: 'test project',
      externalId: 'ext-123',
      comments: 'test comments',
      isActive: true,
      employees: [
        {
          id: 'employee-1',
          employeeName: 'John Doe',
          isAssigned: true,
        },
        {
          id: 'employee-2',
          employeeName: 'Jane Smith',
          isAssigned: false,
        },
        {
          id: 'employee-3',
          employeeName: 'Bob Johnson',
        },
      ],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return expected result when feeding project without optional fields', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test-id',
      name: 'test project',
      isActive: false,
      employees: [
        {
          id: 'employee-1',
          employeeName: 'John Doe',
        },
      ],
    };

    const expectedResult: viewModel.Project = {
      id: 'test-id',
      name: 'test project',
      isActive: false,
      employees: [
        {
          id: 'employee-1',
          employeeName: 'John Doe',
        },
      ],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});

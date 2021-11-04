USE [master]
GO
IF db_id('Celestial') IS NOT NULL
BEGIN
  ALTER DATABASE [Celestial] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
  DROP DATABASE [Celestial]
END
GO
CREATE DATABASE [Celestial]
GO
USE [Celestial]
GO
---------------------------------------------------------------------------
CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FireBaseId] nvarchar(28) NOT NULL
)
GO
CREATE TABLE [Star] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Diameter] int NOT NULL,
  [Mass] int NOT NULL,
  [Temperature] int NOT NULL,
  [StarTypeId] int,
  [UserId] int
)
GO
CREATE TABLE [StarType] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Type] nvarchar(255) NOT NULL,
  [Details] nvarchar(255) 
)
GO
CREATE TABLE [StarDetail] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [StarId] int,
  [UserId] int,
  [Notes] nvarchar(255)
)
GO
CREATE TABLE [Planet] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Diameter] int NOT NULL,
  [DistanceFromStar] int NOT NULL,
  [OrbitalPeriod] int NOT NULL,
  [StarId] int,
  [PlanetTypeId] int,
  [ColorId] int,
  [UserId] int
)
GO
CREATE TABLE [PlanetType] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Type] nvarchar(255) NOT NULL,
  [Details] nvarchar(255)
)
GO
CREATE TABLE [PlanetDetail] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int,
  [PlanetId] int,
  [Notes] nvarchar(255)
)
GO
CREATE TABLE [Moon] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Diameter] int NOT NULL,
  [DistanceFromPlanet] int NOT NULL,
  [OrbitalPeriod] int NOT NULL,
  [MoonTypeId] int,
  [PlanetId] int,
  [UserId] int
)
GO
CREATE TABLE [MoonType] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Type] nvarchar(255) NOT NULL,
  [Details] nvarchar(255)
)
GO
CREATE TABLE [MoonDetail] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [MoonId] int,
  [UserId] int,
  [Notes] nvarchar(255)
)
GO
CREATE TABLE [Color] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Paint] nvarchar(255) NOT NULL
)
GO
CREATE TABLE [StarImage] (
  [Id] int,
  [Image] image
)
GO
CREATE TABLE [PlanetImage] (
  [Id] int,
  [Image] image
)
GO
CREATE TABLE [MoonImage] (
  [Id] int,
  [Image] image
)
GO
ALTER TABLE [Star] ADD FOREIGN KEY ([StarTypeId]) REFERENCES [StarType] ([Id])
GO
ALTER TABLE [Star] ADD FOREIGN KEY ([UserId]) REFERENCES [user] ([Id])
GO
ALTER TABLE [StarDetail] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO
ALTER TABLE [Planet] ADD FOREIGN KEY ([PlanetTypeId]) REFERENCES [PlanetType] ([Id])
GO
ALTER TABLE [Planet] ADD FOREIGN KEY ([colorId]) REFERENCES [color] ([Id])
GO
ALTER TABLE [Planet] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO
ALTER TABLE [PlanetDetail] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO
ALTER TABLE [Moon] ADD FOREIGN KEY ([MoonTypeId]) REFERENCES [MoonType] ([Id])
GO
ALTER TABLE [Moon] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO
ALTER TABLE [MoonDetail] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO
ALTER TABLE [Planet] ADD FOREIGN KEY ([StarId]) REFERENCES [Star] ([Id])
GO
ALTER TABLE [Moon] ADD FOREIGN KEY ([PlanetId]) REFERENCES [Planet] ([Id])
GO
ALTER TABLE [StarDetail] ADD FOREIGN KEY ([StarId]) REFERENCES [Star] ([Id])
GO
ALTER TABLE [PlanetDetail] ADD FOREIGN KEY ([PlanetId]) REFERENCES [Planet] ([Id])
GO
ALTER TABLE [MoonDetail] ADD FOREIGN KEY ([MoonId]) REFERENCES [Moon] ([Id])
GO


---------------------------------------------------------------------------------

Added Cascade delete later in project

SET IDENTITY_INSERT [Planet] ON
ALTER TABLE Planet
DROP CONSTRAINT IF EXISTS FK_StarId_Planet

ALTER TABLE Planet
ADD CONSTRAINT FK_StarId_Planet_Cascade
FOREIGN KEY (StarId) REFERENCES Star(Id) ON DELETE CASCADE
SET IDENTITY_INSERT [Planet] OFF

SET IDENTITY_INSERT [PlanetDetail] ON
ALTER TABLE PlanetDetail
DROP CONSTRAINT IF EXISTS FK_PlanetId_PlanetDetail 

ALTER TABLE PlanetDetail
ADD CONSTRAINT FK_PlanetId_PlanetDetail_Cascade 
FOREIGN KEY (PlanetId) REFERENCES Planet(Id) ON DELETE CASCADE
SET IDENTITY_INSERT [PlanetDetail] OFF

SET IDENTITY_INSERT [StarDetail] ON
ALTER TABLE StarDetail
DROP CONSTRAINT IF EXISTS FK_StarId_StarDetail 

ALTER TABLE StarDetail 
ADD CONSTRAINT FK_StarId_StarDetail_Cascade 
FOREIGN KEY (StarId) REFERENCES Star(Id) ON DELETE CASCADE
SET IDENTITY_INSERT [StarDetail] OFF

SET IDENTITY_INSERT [MoonDetail] ON
ALTER TABLE MoonDetail
DROP CONSTRAINT IF EXISTS FK_MoonId_MoonDetail 

ALTER TABLE MoonDetail
ADD CONSTRAINT FK_MoonId_MoonDetail_Cascade 
FOREIGN KEY (MoonId) REFERENCES Moon(Id) ON DELETE CASCADE
SET IDENTITY_INSERT [MoonDetail] OFF

SET IDENTITY_INSERT [Moon] ON
ALTER TABLE Moon
DROP CONSTRAINT IF EXISTS FK_PlanetId_Moon 

ALTER TABLE Moon 
ADD CONSTRAINT FK_PlanetId_Moon_Cascade 
FOREIGN KEY (PlanetId) REFERENCES Planet(Id) ON DELETE CASCADE
SET IDENTITY_INSERT [Moon] OFF
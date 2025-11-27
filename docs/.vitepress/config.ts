import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '📚 Biblioteca Digital - Clean Architecture',
  description: 'Sistema de gestión de bibliotecas digitales siguiendo principios de Arquitectura Limpia y documentado con Modelo C4',
  base: '/biblioteca-digital-clean-architecture/',
  head: [
    ['link', { rel: 'icon', href: '/biblioteca-digital-clean-architecture/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  },

  themeConfig: {
    logo: '📚',
    siteTitle: 'Biblioteca Digital - Clean Architecture',
    
    nav: [
      { text: '🏠 Inicio', link: '/' },
      { text: '🏗️ Arquitectura', link: '/architecture/' },
      { text: '📊 Modelo C4', link: '/c4-model/' },
      { text: '💻 Implementación', link: '/implementation/' },
      { text: '🚀 Demo', link: '/demo/' }
    ],

    sidebar: {
      '/architecture/': [
        {
          text: '🏗️ Arquitectura Limpia',
          collapsed: false,
          items: [
            { text: '📖 Introducción', link: '/architecture/' },
            { text: '⚡ Principios SOLID', link: '/architecture/principles' },
            { text: '🎯 Capas y Responsabilidades', link: '/architecture/layers' },
            { text: '🔄 Inversión de Dependencias', link: '/architecture/dependencies' },
            { text: '✅ Beneficios', link: '/architecture/benefits' }
          ]
        }
      ],
      '/c4-model/': [
        {
          text: '📊 Modelo C4',
          collapsed: false,
          items: [
            { text: '📋 Introducción al C4', link: '/c4-model/' },
            { text: '🌍 Nivel 1: Contexto del Sistema', link: '/c4-model/context' },
            { text: '📦 Nivel 2: Contenedores', link: '/c4-model/containers' },
            { text: '🔧 Nivel 3: Componentes', link: '/c4-model/components' },
            { text: '💻 Nivel 4: Código', link: '/c4-model/code' }
          ]
        }
      ],
      '/implementation/': [
        {
          text: '💻 Implementación',
          collapsed: false,
          items: [
            { text: '📁 Estructura del Proyecto', link: '/implementation/' },
            { text: '🎯 Capa de Dominio', link: '/implementation/domain' },
            { text: '📋 Capa de Aplicación', link: '/implementation/application' },
            { text: '🔧 Capa de Infraestructura', link: '/implementation/infrastructure' },
            { text: '🖥️ Capa de Presentación', link: '/implementation/presentation' },
            { text: '🧪 Testing', link: '/implementation/testing' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tu-usuario/biblioteca-digital-clean-architecture' }
    ],

    footer: {
      message: '📚 Sistema de Biblioteca Digital con Clean Architecture',
      copyright: 'Copyright © 2024 - Reto de Arquitectura Limpia'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/tu-usuario/biblioteca-digital-clean-architecture/edit/main/docs/:path',
      text: 'Editar esta página en GitHub'
    },

    lastUpdated: {
      text: 'Última actualización',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  }
})
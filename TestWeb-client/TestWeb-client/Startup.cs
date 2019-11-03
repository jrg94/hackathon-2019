using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TestWeb_client.Startup))]
namespace TestWeb_client
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}

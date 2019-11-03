<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="TestWeb_client._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    

        
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">


         <!-- Content Row -->

          <div class="row">
            <script src="https://d3js.org/d3.v5.min.js"></script>
	        <script src="js\vis.js"></script>

                
                </div>
                <!-- Card Body -->
                <div class="card-body">
                  <div class="chart-area">
                    <svg id="vis"></svg>
                    <svg id="Legend"></svg>
                  </div>
                </div>
              </div>
            </div>
         </div>
       </div>




  
        <!-- /.container-fluid -->

      

</asp:Content>

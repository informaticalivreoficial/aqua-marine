@extends('web.master.master')

@section('content')
<header class="page-head slider-menu-position">
    @include('web.include.header')  

<section class="section-height-800 breadcrumb-modern rd-parallax context-dark bg-gray-darkest text-lg-left">
    <div data-speed="0.2" data-type="media" data-url="{{url(asset('frontend/assets/images/backgrounds/background-01-1920x900.jpg'))}}" class="rd-parallax-layer"></div>
        <div data-speed="0" data-type="html" class="rd-parallax-layer">
        <div class="bg-primary-chathams-blue-reverse">
            <div class="shell section-top-57 section-bottom-30 section-md-top-185">
            <div class="veil reveal-md-block">
                <h1 class="text-bold">Políticas de Privacidade</h1>
            </div>
            <ul class="list-inline list-inline-icon list-inline-icon-type-1 list-inline-icon-extra-small list-inline-icon-white p offset-top-30 offset-md-top-40">
                <li><a href="{{route('web.home')}}" class="text-white">Início</a></li>
                <li>Políticas de Privacidade</li>
            </ul>
            </div>
        </div>
    </div>
</section>
</header>
<!-- Page Contents-->
<main class="page-content">
<!-- Blog Classic-->
<div id="fb-root"></div>
<section class="section-90 section-md-111 text-left">
    <div class="shell">
    <div class="range range-xs-center range-lg-right">
        <div class="cell-sm-12 cell-md-12">                   
            <div class="offset-top-30">
                {!! $configuracoes->politicas_de_privacidade !!}
            </div>
        </div>       
    </div>
    </div>
</section>
</main>      
@endsection

@section('css')
<style>
    .btn-front{
        background-color: #6ebf58;
        color:#fff;
        border-radius: .25rem;
        padding: 3px 8px !important;
        border:none;

        
    }
    .btn-front:hover, mdi:hover{
        color:#fff;
    }
</style>
@endsection
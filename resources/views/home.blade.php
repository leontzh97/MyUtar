@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Administrative Staff Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    <a href="{{ route('Notification') }}"><img src="notification.png" height=150 width=150 alt="NotificationIcon"/></a>
                    <a href="{{ route('Event') }}"><img src="event.png" height=150 width=150 alt="EventIcon"/></a>
                    <a href="{{ route('Backup') }}"><img src="backup.jpg" height=100 width=100 alt="BackupIcon"/></a>
                    <a href="{{ route('BulkArchiveOrDelete') }}"><img src="archiveordelete.png" height=150 width=200 alt="BackupIcon"/></a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
